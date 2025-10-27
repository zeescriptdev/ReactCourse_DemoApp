import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import csurf from 'csurf'
import crypto from 'crypto'
import { z } from 'zod'
import { config } from './config.js'
import logger from './logger.js'
import { db, migrate, upsertUser, listChats, listMessages, createChat, addMessage, getProfile, setProfile } from './db.js'
import { encrypt, decrypt } from './crypto.js'
import { verifyFirebaseIdToken, issueJwt, requireAuth } from './auth.js'

const app = express()

// Security & basics
app.use(helmet())
app.use(cookieParser())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.use(cors({
  origin: config.clientOrigin,
  credentials: true,
}))

// Rate limiting
const globalLimiter = rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max })
app.use(globalLimiter)

// CSRF protection using cookie-based tokens; expose a route to fetch token
const csrfProtection = csurf({ cookie: true })
app.use(csrfProtection)

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// Health
app.get('/health', (_req, res) => res.json({ ok: true }))

// Auth routes
app.post('/auth/login', async (req, res) => {
  const schema = z.object({ idToken: z.string().min(10) })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
  try {
    const decoded = await verifyFirebaseIdToken(parsed.data.idToken)
    const { uid, email, name, picture } = decoded
    upsertUser({ id: uid, email, name: name ?? '', photo_url: picture ?? '' })

    const token = issueJwt({ uid })
    res.cookie('session', token, {
      httpOnly: true,
      secure: false, // set true behind HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.json({ ok: true })
  } catch (err) {
    logger.warn('[auth] login failed', { error: err.message })
    res.status(401).json({ error: 'Invalid token' })
  }
})

app.post('/auth/logout', (req, res) => {
  res.clearCookie('session')
  res.json({ ok: true })
})

// Profile routes
app.get('/profile', requireAuth, (req, res) => {
  const profile = getProfile(req.user.uid) || { user_id: req.user.uid, display_name: '', bio: '' }
  res.json(profile)
})

app.put('/profile', requireAuth, (req, res) => {
  const schema = z.object({ display_name: z.string().max(80), bio: z.string().max(500) })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
  setProfile(req.user.uid, parsed.data)
  res.json({ ok: true })
})

// Chats
app.get('/chats', requireAuth, (req, res) => {
  const chats = listChats(req.user.uid)
  res.json(chats)
})

app.get('/chats/:id', requireAuth, (req, res) => {
  const messages = listMessages(req.params.id).map(m => ({
    id: m.id,
    role: m.role,
    content: decrypt({ iv: m.content_iv, tag: m.content_tag, data: m.content_data }),
    created_at: m.created_at,
  }))
  res.json(messages)
})

// Alternative endpoint for messages (more RESTful)
app.get('/chats/:id/messages', requireAuth, (req, res) => {
  const messages = listMessages(req.params.id).map(m => ({
    id: m.id,
    role: m.role,
    content: decrypt({ iv: m.content_iv, tag: m.content_tag, data: m.content_data }),
    created_at: m.created_at,
  }))
  res.json(messages)
})

app.post('/chats', requireAuth, (req, res) => {
  const schema = z.object({ title: z.string().optional() })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
  const chatId = createChat(req.user.uid, parsed.data.title)
  res.json({ id: chatId })
})

// Ollama chat: send user message, get assistant reply, store both
app.post('/chats/:id/messages', requireAuth, async (req, res) => {
  const schema = z.object({ content: z.string().min(1).max(4000) })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
  const { content } = parsed.data
  const chatId = req.params.id

  try {
    const encUser = encrypt(content)
    addMessage({ id: crypto.randomUUID(), chat_id: chatId, role: 'user', content_iv: encUser.iv, content_tag: encUser.tag, content_data: encUser.data })

    // Build conversation context
    const history = listMessages(chatId).map(m => ({ role: m.role, content: decrypt({ iv: m.content_iv, tag: m.content_tag, data: m.content_data }) }))
    const messages = history.concat([{ role: 'user', content }])

    // Call Ollama
    const resp = await fetch(`${config.ollama.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: config.ollama.model, messages, stream: false })
    })
    if (!resp.ok) {
      const text = await resp.text()
      logger.error('[ollama] request failed', { status: resp.status, body: text })
      return res.status(500).json({ error: 'LLM error' })
    }
    const data = await resp.json()
    const assistantText = data?.message?.content ?? data?.response ?? ''
    if (!assistantText) return res.status(500).json({ error: 'Invalid LLM response' })

    const encAssistant = encrypt(assistantText)
    addMessage({ id: crypto.randomUUID(), chat_id: chatId, role: 'assistant', content_iv: encAssistant.iv, content_tag: encAssistant.tag, content_data: encAssistant.data })

    res.json({ role: 'assistant', content: assistantText })
  } catch (err) {
    logger.error('[chat] failed to process message', { error: err.message })
    res.status(500).json({ error: 'Server error' })
  }
})

// Backup endpoint (requires x-api-key)
app.post('/admin/backup', async (req, res) => {
  const key = req.headers['x-api-key']
  if (!config.serverApiKey || key !== config.serverApiKey) return res.status(403).json({ error: 'Forbidden' })
  try {
    const file = `./server/backups/backup-${Date.now()}.sqlite`
    await db.backup(file)
    res.json({ ok: true, file })
  } catch (err) {
    logger.error('[backup] failed', { error: err.message })
    res.status(500).json({ error: 'Backup failed' })
  }
})

// Error handler
app.use((err, _req, res, _next) => {
  logger.error('[unhandled]', { error: err.message, stack: err.stack })
  res.status(500).json({ error: 'Internal server error' })
})

// Startup
migrate()

app.listen(config.port, () => {
  logger.info(`[server] listening on http://localhost:${config.port}`)
})
import admin from 'firebase-admin'
import jwt from 'jsonwebtoken'
import { config } from './config.js'
import logger from './logger.js'

let initialized = false
function initFirebase() {
  if (initialized) return
  try {
    if (config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey,
        }),
      })
    } else {
      admin.initializeApp({ credential: admin.credential.applicationDefault() })
    }
    initialized = true
    logger.info('[auth] Firebase Admin initialized')
  } catch (err) {
    logger.error('[auth] Failed to initialize Firebase Admin', { error: err.message })
    throw err
  }
}

export async function verifyFirebaseIdToken(idToken) {
  initFirebase()
  try {
    const decoded = await admin.auth().verifyIdToken(idToken)
    return decoded
  } catch (err) {
    logger.warn('[auth] Invalid Firebase ID token', { error: err.message })
    throw err
  }
}

export function issueJwt(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch {
    return null
  }
}

export function requireAuth(req, res, next) {
  const token = req.cookies['session']
  const decoded = token ? verifyJwt(token) : null
  if (!decoded) return res.status(401).json({ error: 'Unauthorized' })
  req.user = decoded
  next()
}

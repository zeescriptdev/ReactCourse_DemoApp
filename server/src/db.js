import Database from 'better-sqlite3'
import crypto from 'crypto'
import { config } from './config.js'
import logger from './logger.js'

export const db = new Database(config.dbPath)

db.pragma('journal_mode = WAL')

export function migrate() {
  logger.info('[db] Applying migrations...')

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      name TEXT,
      photo_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS profiles (
      user_id TEXT PRIMARY KEY,
      display_name TEXT,
      bio TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT NOT NULL,
      role TEXT CHECK(role IN ('user','assistant','system')) NOT NULL,
      content_iv TEXT NOT NULL,
      content_tag TEXT NOT NULL,
      content_data TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(chat_id) REFERENCES chats(id)
    );
  `)

  logger.info('[db] Migrations applied')
}

export function upsertUser({ id, email, name, photo_url }) {
  const stmt = db.prepare(`INSERT INTO users (id, email, name, photo_url)
    VALUES (@id, @email, @name, @photo_url)
    ON CONFLICT(id) DO UPDATE SET email=excluded.email, name=excluded.name, photo_url=excluded.photo_url`)
  stmt.run({ id, email, name, photo_url })
}

export function getProfile(userId) {
  const stmt = db.prepare('SELECT user_id, display_name, bio, updated_at FROM profiles WHERE user_id = ?')
  return stmt.get(userId)
}

export function setProfile(userId, { display_name, bio }) {
  const stmt = db.prepare(`INSERT INTO profiles (user_id, display_name, bio, updated_at)
    VALUES (@user_id, @display_name, @bio, datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET display_name=excluded.display_name, bio=excluded.bio, updated_at=excluded.updated_at`)
  stmt.run({ user_id: userId, display_name, bio })
}

export function createChat(userId, title) {
  const id = crypto.randomUUID()
  const stmt = db.prepare('INSERT INTO chats (id, user_id, title) VALUES (?, ?, ?)')
  stmt.run(id, userId, title ?? 'New Chat')
  return id
}

export function listChats(userId) {
  const stmt = db.prepare('SELECT id, title, created_at FROM chats WHERE user_id = ? ORDER BY created_at DESC')
  return stmt.all(userId)
}

export function addMessage({ id, chat_id, role, content_iv, content_tag, content_data }) {
  const stmt = db.prepare('INSERT INTO messages (id, chat_id, role, content_iv, content_tag, content_data) VALUES (@id, @chat_id, @role, @content_iv, @content_tag, @content_data)')
  stmt.run({ id, chat_id, role, content_iv, content_tag, content_data })
}

export function listMessages(chatId) {
  const stmt = db.prepare('SELECT id, role, content_iv, content_tag, content_data, created_at FROM messages WHERE chat_id = ? ORDER BY created_at ASC')
  return stmt.all(chatId)
}
import crypto from 'crypto'
import { config } from './config.js'

const key = Buffer.from(config.encryptionKeyHex, 'hex')

export function encrypt(text) {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return {
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    data: ciphertext.toString('hex'),
  }
}

export function decrypt({ iv, tag, data }) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(data, 'hex')),
    decipher.final(),
  ])
  return plaintext.toString('utf8')
}
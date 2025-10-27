import winston from 'winston'

const { combine, timestamp, printf, colorize } = winston.format

const fmt = printf(({ level, message, timestamp, stack, ...meta }) => {
  const base = `${timestamp} [${level}] ${message}`
  const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
  const err = stack ? `\n${stack}` : ''
  return base + extra + err
})

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), fmt),
  transports: [
    new winston.transports.Console({ format: combine(colorize(), timestamp(), fmt) }),
  ],
})

export default logger
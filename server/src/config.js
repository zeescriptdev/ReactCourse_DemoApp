import dotenv from 'dotenv'
dotenv.config()

const env = (key, defaultValue) => process.env[key] || defaultValue

export const config = {
    port: Number(env('PORT','4000')),
    clientOrigin: env('CLIENT_ORIGIN','http://localhost:5173'),
    jwtSecret: env('JWT_SECRET','my-secret-key-1'),
    encryptionKeyHex: env('ENCRYPTION_KEY_HEX',''),
    dbPath: env('DB_PATH','./data/app.sqlite'),
    firebase:{
        projectId: env('FIREBASE_PROJECT_ID',''),
        clientEmail: env('FIREBASE_CLIENT_EMAIL',''),
        privateKey: env('FIREBASE_PRIVATE_KEY','')?.replace(/\\n/g, '\n'),
    },
    ollama:{
        baseUrl: env('OLLAMA_BASE_URL','http://localhost:11434'),
        model: env('OLLAMA_MODEL','gemma3:1b'),
    },
    rateLimit:{
        windowMs: Number(env('RATE_LIMIT_WINDOW_MS','60000')),
        max: Number(env('RATE_LIMIT_MAX_REQUESTS','100')),
    },
}

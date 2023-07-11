import { config } from 'dotenv'
config()

// Server Config
export const host = process.env.HOST || 'localhost'
export const port = process.env.PORT || 3000
export const corsOrigin = '*'
export const corsMethods = ['POST']
export const isProduction = process.env.NODE_ENV === 'production'

// Logs
export const logLevel = process.env.LOG_LEVEL || 'info'
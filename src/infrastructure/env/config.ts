import { env } from './environment'

export const serverConfig = {
  env,
  nodeEnv: process.env.NODE_ENV || 'local',
  port: process.env.PORT || '8080',
  mongoUri: process.env.MONGO_URI || ''
}

export const JWT_SECRET = process.env.JWT_SECRET || 'MISSING_SECRET'

import { connection, connect } from 'mongoose'
import { Logger } from '../ioc/logger/Logger'
import { serverConfig } from '../env/config'

const logger = new Logger()

/**
 * Connects to MongoDB using the default Mongoose connection.
 * Connection is OPTIONAL: if MONGO_URI is not set the app boots without a database,
 * which lets the skeleton run out of the box.
 */
export const connectMongo = async (): Promise<void> => {
  if (!serverConfig.mongoUri) {
    logger.warn('[MongoDB] MONGO_URI not set — booting without a database connection')
    return
  }

  connection.once('open', () => logger.info('[MongoDB] Connected'))
  await connect(serverConfig.mongoUri)
}

import { Server } from './server'
import { Logger } from './ioc/logger/Logger'
import { connectMongo } from './MongoDB/MongoDbConnection'
import { serverConfig } from './env/config'

export class Skeleton {
  server?: Server
  private readonly logger = new Logger()

  async start() {
    await connectMongo()
    this.server = new Server(serverConfig.port, this.logger)
    return this.server.listen()
  }

  async stop() {
    return this.server?.stop()
  }
}

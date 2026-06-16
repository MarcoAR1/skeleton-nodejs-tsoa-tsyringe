import 'reflect-metadata'
import { serverConfig } from './env/config'
import { iocContainer } from './ioc/container'
import { json, urlencoded } from 'body-parser'
import { middleware } from 'express-http-context'
import { RegisterRoutes } from './routes/routes'
import * as http from 'http'
import compress from 'compression'
import correlationId from './middlewares/correlationId'
import cors from 'cors'
import Express, { Application, Request, Response } from 'express'
import handleError from './middlewares/handleError'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { Logger, ILogger } from './ioc/logger/Logger'

export class Server {
  private readonly port: string
  private readonly SWAGGER_PATH: string = '/api-docs'
  private readonly httpServer: http.Server
  private readonly logger: ILogger

  constructor(port: string, logger: ILogger = new Logger()) {
    this.port = port
    this.logger = logger
    const app: Application = Express()

    const corsConfiguration: cors.CorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
    }

    // Configure morgan token
    morgan.token('json', (req: Request): string => {
      return JSON.stringify({
        url: req.url,
        method: req.method,
        httpVersion: req.httpVersion
      })
    })

    // Apply middleware
    this.configureMiddleware(app, corsConfiguration)

    // Configure IoC and routes
    this.configIocContainer()
    RegisterRoutes(app)
    this.configSwagger(app)
    app.use(handleError)

    // Initialize HTTP server
    this.httpServer = http.createServer(app)
  }

  private configureMiddleware(app: Application, corsConfiguration: cors.CorsOptions): void {
    app.use(cors(corsConfiguration))
    app.use(middleware)
    app.use(correlationId)
    app.disable('x-powered-by')
    app.use(morgan(':method :status :url :response-time :json'))
    app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
    app.use(json({ limit: '50mb' }))
    app.use(helmet.xssFilter())
    app.use(helmet.noSniff())
    app.use(helmet.hidePoweredBy())
    app.use(helmet.frameguard({ action: 'deny' }))
    app.use(compress())
  }

  public async listen(): Promise<void> {
    await new Promise<void>(resolve => {
      this.httpServer.listen(this.port)
      resolve()
    })

    this.logger.info(`Server running at port ${this.port} in ${serverConfig.env} mode`)
    this.logger.info(`Swagger docs at http://localhost:${this.port}${this.SWAGGER_PATH}/`)
    this.logger.info('Press CTRL-C to stop')
  }

  public async stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error?: Error) => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      } else {
        resolve()
      }
    })
  }

  public async configIocContainer(): Promise<void> {
    if (!iocContainer) {
      throw new Error('container is not initialized')
    }
  }

  public getServer(): http.Server {
    return this.httpServer
  }

  private configSwagger(app: Application): void {
    app.use(this.SWAGGER_PATH, swaggerUi.serve, async (_req: Request, res: Response): Promise<void> => {
      const swagger = await import('./routes/swagger.json')
      res.send(swaggerUi.generateHTML(swagger))
    })
  }
}

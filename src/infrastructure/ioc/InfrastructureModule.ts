import { container } from 'tsyringe'
import { IHttpClientBase, HttpClientBase } from './httpClients/httpClientBase'
import { ILogger, Logger } from './logger/Logger'
import { ModuleContainerBase } from './moduleContainerBase'
import { TYPES } from './Type'

export class InfrastructureModule implements ModuleContainerBase {
  run() {
    container.registerSingleton<IHttpClientBase>(TYPES.HttpClientCore, HttpClientBase)
    container.registerSingleton<ILogger>(TYPES.ILogger, Logger)
  }
}

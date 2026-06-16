import 'reflect-metadata'
import { HealthModule } from '../../contexts/health/infrastructure/HealthModule'
import { ItemModule } from '../../contexts/item/infrastructure/ItemModule'
import { IocContainer, ServiceIdentifier } from '@tsoa/runtime'
import { container } from 'tsyringe'
import { InfrastructureModule } from './InfrastructureModule'

// InfrastructureModule MUST be first (registers ILogger, HttpClient, etc.)
const modules = [InfrastructureModule, HealthModule, ItemModule]

modules.forEach(module => new module().run())
export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    return container.resolve<T>(controller as never)
  }
}

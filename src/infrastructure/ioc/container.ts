import 'reflect-metadata'
import { HealthModule } from '../../contexts/health/infrastructure/HealthModule'
import { ChatModule } from '../../contexts/chat/infrastructure/ChatModule'
import { IocContainer, ServiceIdentifier } from '@tsoa/runtime'
import { container } from 'tsyringe'
import { InfrastructureModule } from './InfrastructureModule'

const modules = [InfrastructureModule, HealthModule, ChatModule]

modules.forEach(module => new module().run())
export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    return container.resolve<T>(controller as never)
  }
}

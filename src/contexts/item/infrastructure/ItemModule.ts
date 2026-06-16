import { container } from 'tsyringe'
import { ModuleContainerBase } from '../../../infrastructure/ioc/moduleContainerBase'
import { ITEM_REPOSITORY } from '../domain/repositories/IItemRepository'
import { MongoItemRepository } from './persistence/MongoItemRepository'
import { ItemService } from '../application/services/ItemService'
// Side-effect import so the controller's decorators are registered.
import '../entrypoint/ItemController'

/**
 * Item Module — wires the context into the DI container.
 * Bind the repository INTERFACE token to its Mongo implementation.
 */
export class ItemModule implements ModuleContainerBase {
  run(): void {
    container.register(ITEM_REPOSITORY, { useClass: MongoItemRepository })
    container.registerSingleton(ItemService)
  }
}

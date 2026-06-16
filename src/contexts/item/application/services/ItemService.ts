import { inject, injectable } from 'tsyringe'
import { TYPES } from '../../../../infrastructure/ioc/Type'
import type { ILogger } from '../../../../infrastructure/ioc/logger/Logger'
import { ITEM_REPOSITORY, IItemRepository } from '../../domain/repositories/IItemRepository'
import { CreateItemInput, Item, UpdateItemInput } from '../../domain/entities/Item'
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError'

/**
 * ItemService — APPLICATION layer.
 * Owns ALL business logic. Depends on the repository INTERFACE (injected token),
 * never on Mongoose.
 */
@injectable()
export class ItemService {
  constructor(
    @inject(TYPES.ILogger) private readonly logger: ILogger,
    @inject(ITEM_REPOSITORY) private readonly itemRepo: IItemRepository
  ) {}

  list(): Promise<Item[]> {
    return this.itemRepo.findAll()
  }

  async getById(id: string): Promise<Item> {
    const item = await this.itemRepo.findById(id)
    if (!item) throw new NotFoundError(`Item ${id} not found`)
    return item
  }

  create(input: CreateItemInput): Promise<Item> {
    this.logger.info(`[ItemService] Creating item: ${input.name}`)
    return this.itemRepo.create(input)
  }

  async update(id: string, updates: UpdateItemInput): Promise<Item> {
    const updated = await this.itemRepo.update(id, updates)
    if (!updated) throw new NotFoundError(`Item ${id} not found`)
    return updated
  }

  async remove(id: string): Promise<void> {
    await this.getById(id)
    await this.itemRepo.delete(id)
  }
}

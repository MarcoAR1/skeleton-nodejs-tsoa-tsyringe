import { CreateItemInput, Item, UpdateItemInput } from '../entities/Item'

/**
 * Repository contract lives in the DOMAIN layer.
 * The concrete Mongo implementation lives in infrastructure/persistence.
 * Services depend on THIS interface (via the token), never on Mongoose.
 */
export interface IItemRepository {
  findAll(): Promise<Item[]>
  findById(id: string): Promise<Item | null>
  create(input: CreateItemInput): Promise<Item>
  update(id: string, updates: UpdateItemInput): Promise<Item | null>
  delete(id: string): Promise<void>
}

export const ITEM_REPOSITORY = Symbol.for('IItemRepository')

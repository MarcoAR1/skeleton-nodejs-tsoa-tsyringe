import { injectable } from 'tsyringe'
import { IItemRepository } from '../../domain/repositories/IItemRepository'
import { CreateItemInput, Item, UpdateItemInput } from '../../domain/entities/Item'
import { ItemDocument, ItemModel } from './ItemModel'

/**
 * Mongo implementation of IItemRepository.
 * Returns PLAIN domain objects (via .lean()), never Mongoose documents.
 */
@injectable()
export class MongoItemRepository implements IItemRepository {
  async findAll(): Promise<Item[]> {
    const docs = await ItemModel.find().sort({ createdAt: -1 }).lean<ItemDocument[]>()
    return docs.map(MongoItemRepository.toItem)
  }

  async findById(id: string): Promise<Item | null> {
    const doc = await ItemModel.findById(id).lean<ItemDocument | null>()
    return doc ? MongoItemRepository.toItem(doc) : null
  }

  async create(input: CreateItemInput): Promise<Item> {
    const created = await ItemModel.create(input)
    return MongoItemRepository.toItem(created.toObject() as unknown as ItemDocument)
  }

  async update(id: string, updates: UpdateItemInput): Promise<Item | null> {
    const doc = await ItemModel.findByIdAndUpdate(id, updates, { returnDocument: 'after' }).lean<ItemDocument | null>()
    return doc ? MongoItemRepository.toItem(doc) : null
  }

  async delete(id: string): Promise<void> {
    await ItemModel.deleteOne({ _id: id })
  }

  private static toItem(doc: ItemDocument): Item {
    return {
      id: String(doc._id),
      name: doc.name,
      description: doc.description ?? undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }
  }
}

import { Schema, Model, SchemaDefinition, SortOrder, Expression, QueryFilter, UpdateQuery } from 'mongoose'
import { IRead, IWrite } from '../interface'
import { MongoConnection } from '../MongoDbConnection'

export abstract class MongoRepositoryBase<TEntity> implements IRead<TEntity>, IWrite<TEntity> {
  protected Model: Model<TEntity>

  protected constructor(mode: null | Model<TEntity>, name?: string, schemaDefinition?: SchemaDefinition<TEntity>) {
    if (mode) this.Model = mode
    else {
      const schema = new Schema<TEntity>(schemaDefinition, { timestamps: true })
      if (name) {
        this.Model = MongoConnection.model<TEntity>(name, schema)
      } else {
        throw new Error('Model name is required')
      }
    }
  }

  public retrieve(filters?: QueryFilter<TEntity>, offset?: number, limit?: number, sort?: SortType) {
    let query = this.Model.find()
    if (filters) query = query.where(filters)
    if (sort) query = query.sort(sort)
    if (offset) query = query.skip(offset)
    if (limit) query = query.limit(limit)
    return query
  }

  public findById(id: string) {
    return this.Model.findById(id)
  }

  public findByOne(filters: QueryFilter<TEntity>) {
    return this.Model.findOne().where(filters)
  }

  public create(item: TEntity) {
    return this.Model.create(item)
  }

  public update(_id: string, item: UpdateQuery<TEntity>) {
    return this.Model.updateOne({ _id }, item)
  }

  public delete(_id: string) {
    return this.Model.deleteOne({ _id })
  }

  public upsert(id: string, item: UpdateQuery<TEntity>) {
    return this.Model.updateOne({ _id: id }, item, { upsert: true })
  }
}

export type SortType =
  | string
  | {
      [key: string]:
        | SortOrder
        | {
            $meta: 'textScore'
          }
    }
  | undefined
  | null

export type SortPipeline = Record<string, 1 | -1 | Expression.Meta>

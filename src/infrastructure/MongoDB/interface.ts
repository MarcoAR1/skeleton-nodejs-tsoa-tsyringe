import type { QueryFilter, UpdateQuery } from 'mongoose'

export interface IRead<T> {
  retrieve: (filter: QueryFilter<T>) => void
  findById: (id: string) => void
  findByOne: (filters: QueryFilter<T>) => void
}

export interface IWrite<T> {
  create: (item: T) => void
  update: (_id: string, item: UpdateQuery<T>) => void
  delete: (_id: string) => void
}

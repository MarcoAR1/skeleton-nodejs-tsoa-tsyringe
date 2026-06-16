import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ItemService } from '../../contexts/item/application/services/ItemService'
import { MongoItemRepository } from '../../contexts/item/infrastructure/persistence/MongoItemRepository'
import { Logger } from '../../infrastructure/ioc/logger/Logger'

let mongod: MongoMemoryServer

// Real service + real repo + real (in-memory) Mongo — no mocks.
const service = new ItemService(new Logger(), new MongoItemRepository())

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
})

beforeEach(async () => {
  await mongoose.connection.collection('items').deleteMany({})
})

describe('ItemService (Controller -> Service -> Repository -> Mongo)', () => {
  it('creates an item and returns a plain domain object', async () => {
    const created = await service.create({ name: 'First', description: 'hello' })

    expect(created.id).toBeDefined()
    expect(created.name).toBe('First')
    expect(created.description).toBe('hello')
  })

  it('lists created items', async () => {
    await service.create({ name: 'A' })
    await service.create({ name: 'B' })

    const all = await service.list()

    expect(all).toHaveLength(2)
  })

  it('throws NotFoundError when an item does not exist', async () => {
    await expect(service.getById('64b7f0000000000000000000')).rejects.toMatchObject({ code: 404 })
  })

  it('updates and deletes an item', async () => {
    const created = await service.create({ name: 'Old' })

    const updated = await service.update(created.id, { name: 'New' })
    expect(updated.name).toBe('New')

    await service.remove(created.id)
    await expect(service.getById(created.id)).rejects.toMatchObject({ code: 404 })
  })
})

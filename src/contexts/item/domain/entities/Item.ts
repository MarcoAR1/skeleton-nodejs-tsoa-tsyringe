/**
 * Item — Domain Entity
 *
 * Pure business type. NO framework imports (no mongoose/express/tsyringe).
 */
export interface Item {
  id: string
  name: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateItemInput {
  name: string
  description?: string
}

export type UpdateItemInput = Partial<CreateItemInput>

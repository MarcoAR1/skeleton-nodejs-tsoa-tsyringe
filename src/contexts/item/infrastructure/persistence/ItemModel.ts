import { Schema, model, Types } from 'mongoose'

/**
 * Mongoose schema/model — INFRASTRUCTURE only.
 * Domain & application layers MUST NOT import this file.
 */
export interface ItemDocument {
  _id: Types.ObjectId
  name: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
}

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true, collection: 'items' }
)

export const ItemModel = model('Item', ItemSchema)

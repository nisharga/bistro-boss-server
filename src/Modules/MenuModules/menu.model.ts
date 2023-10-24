/* eslint-disable no-console */
import { Schema, model } from 'mongoose'
import { IMenu } from './menu.interface'

const menuSchema = new Schema<IMenu>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Menu = model<IMenu>('Menu', menuSchema)

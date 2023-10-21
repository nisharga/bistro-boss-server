/* eslint-disable no-console */
import { Schema, model } from 'mongoose'
import { IUser } from './order.interface'

const orderSchema = new Schema<IUser>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<IUser>('Order', orderSchema)

/* eslint-disable no-console */
import { Schema, model } from 'mongoose'
import { IPayment } from './payment.interface'

const PaymentSchema = new Schema<IPayment>(
  {
    email: { type: String, required: true },
    trxid: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: String, required: true },
    cartItems: [{ type: String, required: true }],
    productNames: [{ type: String, required: true }],
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const Payment = model<IPayment>('Payment', PaymentSchema)

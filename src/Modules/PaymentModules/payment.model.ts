/* eslint-disable no-console */
import { Schema, model } from 'mongoose'
import { IPayment } from './payment.interface'

const PaymentSchema = new Schema<IPayment>(
  {
    email: { type: String },
    trxid: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    date: { type: String },
    cartItems: [{ type: String }],
    productNames: [{ type: String }],
    status: { type: String },
  },
  {
    timestamps: true,
  },
)

export const Payment = model<IPayment>('Payment', PaymentSchema)

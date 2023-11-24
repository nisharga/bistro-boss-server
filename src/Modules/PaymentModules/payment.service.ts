/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPayment } from './payment.interface'
import { Payment } from './payment.model'

const createPayment = async (
  paymentDetails: IPayment,
): Promise<IPayment | null> => {
  const payment = await Payment.create(paymentDetails)
  return payment
}

const getAllPayment = async (): Promise<IPayment[] | null> => {
  const payment = await Payment.find()
  return payment
}

const updatePayment = async (
  id: string,
  payload: Partial<IPayment>,
): Promise<IPayment | null> => {
  const result = await Payment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const paymentSearchByEmail = async (email: string): Promise<IPayment | any> => {
    const result = await Payment.find({ email: email }).exec() // Use findOne instead of find
    return result
  }

export const PaymentService = {
  createPayment,
  getAllPayment,
  updatePayment,
  paymentSearchByEmail
}

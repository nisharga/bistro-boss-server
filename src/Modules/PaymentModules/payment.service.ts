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

export const PaymentService = {
  createPayment,
  getAllPayment,
  updatePayment,
}

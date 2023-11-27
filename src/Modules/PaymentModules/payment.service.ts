/* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu } from '../MenuModules/menu.model'
import sendPaymentConfimationEmail from '../SendMail/SendMail'
import { SingleUser } from '../SingleUserModules/single.user.model'
import { IPayment } from './payment.interface'
import { Payment } from './payment.model'

const createPayment = async (
  paymentDetails: IPayment,
): Promise<IPayment | null> => {
  const payment = await Payment.create(paymentDetails)
  sendPaymentConfimationEmail(payment);
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

const adminDashboard = async (): Promise<any | null> => {
  const totalRevinue = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$price' },
      },
    },
  ])
  const totalUser = await SingleUser.aggregate([
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ])
  const totalProduct = await Menu.aggregate([
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ])
  const orders = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
      },
    },
  ])

  const result = {
    totalUser: totalUser[0]?.totalCount || 0,
    totalRevinue: totalRevinue[0]?.totalPrice || 0,
    totalProduct: totalProduct[0]?.totalCount || 0,
    orders: orders[0]?.totalCount || 0,
  }

  return { data: result }
}

export const PaymentService = {
  createPayment,
  getAllPayment,
  updatePayment,
  paymentSearchByEmail,
  adminDashboard,
}

import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../middleware/catchAsync'
import httpStatus from 'http-status'
import { PaymentService } from './payment.service'
import sendResponse from '../../middleware/sendResponse'
import { IPayment } from './payment.interface'

const createSinglePayment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...singlePaymentData } = req.body

    const result = await PaymentService.createPayment(singlePaymentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Payment created successfully',
      data: result,
    })
  },
)

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayment()

  sendResponse<IPayment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Payment Retrived Successfully',
    data: result,
  })
})

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await PaymentService.updatePayment(id, updatedData)

  sendResponse<IPayment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User Information Successfully',
    data: result,
  })
})

const paymentSearchByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  // console.log(req.docoded.id)
  const result = await PaymentService.paymentSearchByEmail(email)

  sendResponse<IPayment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Payment in this email show Successfully',
    data: result,
  })
})

const adminDashboard = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.adminDashboard()

  sendResponse<IPayment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Dashboard Retrived Successfully',
    data: result,
  })
})

export const paymentController = {
  createSinglePayment,
  getAllPayment,
  updatePayment,
  paymentSearchByEmail,
  adminDashboard,
}

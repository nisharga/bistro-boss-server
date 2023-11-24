import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../middleware/catchAsync'
import { OrderService } from './order.service'
import sendResponse from '../../middleware/sendResponse'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import { IUser, SearchableFields, paginationFields } from './order.interface'

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body
    const result = await OrderService.createOrder(orderData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    })
  },
)

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SearchableFields)

  const paginationOptions = pick(req.query, paginationFields)

  const result = await OrderService.getAllOrder(filters, paginationOptions)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order Retrived Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await OrderService.getSingleOrder(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Order Retrived Successfully',
    data: result,
  })
})

const updateSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await OrderService.updateOrder(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Single Order Successfully',
    data: result,
  })
})

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await OrderService.deleteOrder(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Single Order Successfully',
    data: result,
  })
})

const OrderSearchByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  // console.log(req.docoded.id)
  const result = await OrderService.orderSearchByEmail(email)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order in this email show Successfully',
    data: result,
  })
})

const OrderDeleteByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  // console.log(req.docoded.id)
  const result = await OrderService.allOrderDeleteByEmail(email)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order in this email delete Successfully',
    data: result,
  })
})

const stripePayController = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body
  const amount =  price * 100  
  // console.log(req.docoded.id)
  const result = await OrderService.stripePay(amount)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Successfully Done!!',
    data: result,
  })
})

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateSingleOrder,
  deleteOrder,
  OrderSearchByEmail,
  OrderDeleteByEmail,
  stripePayController,
}

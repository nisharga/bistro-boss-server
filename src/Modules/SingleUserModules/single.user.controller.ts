import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../middleware/catchAsync'
import { SingleUserService } from './single.user.service'
import sendResponse from '../../middleware/sendResponse'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import {
  SearchableFields,
  paginationFields,
} from '../OrderModules/order.interface'
import { ISingleUser } from './single.user.interface'

const createSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
     
   const { ...singleUserData } = req.body 

    const result = await SingleUserService.createUser(singleUserData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User created successfully',
      data: result,
    })
  },
)

const createJWT: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body
    const result = await SingleUserService.createJwt(email)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'JWT token created successfully',
      data: result,
    })
  },
)

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SearchableFields)

  const paginationOptions = pick(req.query, paginationFields)

  const result = await SingleUserService.getAllUser(filters, paginationOptions)

  sendResponse<ISingleUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users Retrived Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await SingleUserService.updateUser(id, updatedData)

  sendResponse<ISingleUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User Information Successfully',
    data: result,
  })
})

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await SingleUserService.deleteUser(id)

  sendResponse<ISingleUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Single User Successfully',
    data: result,
  })
})

const getAdminEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  const result = await SingleUserService.getAdminEmail(email)

  sendResponse<ISingleUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin information Retrived Successfully',
    data: result,
  })
})

export const SingleUserController = {
  createSingleUser,
  getAllUsers,
  updateSingleUser,
  deleteSingleUser,
  createJWT,
  getAdminEmail
}

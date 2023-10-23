/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../shared/paginationHelper'
import {
  IGenericResponse,
  IPaginationOptions,
  IUser,
  IUserFilterRequest,
  SearchableFields,
} from './order.interface'
import { Order } from './order.model'

const createOrder = async (orderDetails: IUser): Promise<IUser | null> => {
  const newOrder = await Order.create(orderDetails)
  return newOrder
}

const getAllOrder = async (
  filters: IUserFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: SearchableFields.map((field: any) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Order.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleOrder = async (id: string): Promise<IUser | null> => {
  const result = await Order.findById(id)
  return result
}

const updateOrder = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await Order.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteOrder = async (id: string): Promise<IUser | null> => {
  const result = await Order.findByIdAndDelete(id)
  return result
}

const orderSearchByEmail = async (email: string): Promise<IUser | null> => {
  const result = await Order.find({ email: email }).exec(); // Use findOne instead of find
  return result || null;
}

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  orderSearchByEmail,
}

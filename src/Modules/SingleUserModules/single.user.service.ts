/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { IGenericResponse, IPaginationOptions, SearchableFields } from "../OrderModules/order.interface";
import { ISingleUser, ISingleUserFilterRequest } from "./single.user.interface"
import { SingleUser } from "./single.user.model"
import { paginationHelpers } from "../../shared/paginationHelper";

const createUser = async (userDetails: ISingleUser): Promise<ISingleUser | null> => {
  const newUser = await SingleUser.create(userDetails)
  return newUser;
}

const getAllUser = async (
  filters: ISingleUserFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISingleUser[]>> => {
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

  const result = await SingleUser.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await SingleUser.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateUser = async (
  id: string,
  payload: Partial<ISingleUser>,
): Promise<ISingleUser | null> => {
  const result = await SingleUser.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string): Promise<ISingleUser | null> => {
  const result = await SingleUser.findByIdAndDelete(id)
  return result
}


export const SingleUserService = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser
}

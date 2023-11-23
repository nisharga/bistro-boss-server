/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../shared/paginationHelper'
import { IMenu } from './menu.interface'
import { Menu } from './menu.model'
import {
  IGenericMenuResponse,
  IMenuFilterRequest,
  IPaginationMenuOptions,
  SearchableFieldsMenu,
} from './menu.ultis'

const getSingleMenu = async (id: string): Promise<IMenu | null> => {
  const result = await Menu.findById(id)
  return result
}

const createMenu = async (menuDetails: IMenu): Promise<IMenu | null> => {
  const menu = await Menu.create(menuDetails)
  return menu
}
const getAll = async (): Promise<IMenu[] | null> => {
  const menu = await Menu.find()
  return menu
}

const getAllMenu = async (
  filters: IMenuFilterRequest,
  paginationOptions: IPaginationMenuOptions,
): Promise<IGenericMenuResponse<IMenu[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: SearchableFieldsMenu.map((field: any) => ({
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

  const result = await Menu.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Menu.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateMenu = async (
  id: string,
  payload: Partial<IMenu>,
): Promise<IMenu | null> => {
  const result = await Menu.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteMenu = async (id: string): Promise<IMenu | null> => {
  const result = await Menu.findByIdAndDelete(id)
  return result
}

export const MenuService = {
  getSingleMenu,
  createMenu,
  getAllMenu,
  updateMenu,
  deleteMenu,
  getAll,
}

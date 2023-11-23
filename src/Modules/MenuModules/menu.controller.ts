import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../middleware/catchAsync'
import sendResponse from '../../middleware/sendResponse'
import httpStatus from 'http-status'
import { MenuService } from './menu.service'
import pick from '../../shared/pick'
import { SearchableFieldsMenu } from './menu.ultis'
import { paginationFields } from '../OrderModules/order.interface'
import { IMenu } from './menu.interface'

const getSingleMenu = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await MenuService.getSingleMenu(id)

  sendResponse<IMenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Menu Retrived Successfully',
    data: result,
  })
})

const createMenu: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...menuData } = req.body
    const result = await MenuService.createMenu(menuData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'File Created Successfully',
      data: result,
    })
  },
)

const getAllMenus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SearchableFieldsMenu)

  const paginationOptions = pick(req.query, paginationFields)

  const result = await MenuService.getAllMenu(filters, paginationOptions)

  sendResponse<IMenu[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Menu Retrived Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateMenu = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await MenuService.updateMenu(id, updatedData)

  sendResponse<IMenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updateMenu Successfully',
    data: result,
  })
})

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await MenuService.getAll()

  sendResponse<IMenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Menu Successfully',
    data: result,
  })
})

const deleteMenu = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await MenuService.deleteMenu(id)

  sendResponse<IMenu>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Menu Successfully',
    data: result,
  })
})

export const MenuController = {
  getSingleMenu,
  createMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
  getAll,
}

import { Request, RequestHandler, Response } from "express"
import catchAsync from "../../middleware/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import httpStatus from "http-status"
import { MenuService } from "./menu.service"


const createMenu: RequestHandler = catchAsync(async (req: Request, res: Response) => {
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

export const MenuController = {
    createMenu
  }
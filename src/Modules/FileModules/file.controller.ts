import { Request, RequestHandler, Response } from "express"
import catchAsync from "../../middleware/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import httpStatus from "http-status"
import { FileService } from "./file.service"


const createFile: RequestHandler = catchAsync(async (req: Request, res: Response) => {
       
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }  
     const { filename, path } = req.file;  

     const fileData = {filename, path};
       
    
     const result = await FileService.createFile(fileData)

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'File Created Successfully',
        data: result,
      })
    },
  )

export const FileController = {
    createFile
  }
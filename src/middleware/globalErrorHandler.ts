/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import config from '../config'
import ApiError from '../errors/ApiError'
import { IGenericErrorMessage } from '../interfaces/error'
import handleValidationError from '../errors/handleValidationError' 

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
   
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } 
  
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.json({
    sucess: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  
}

export default globalErrorHandler

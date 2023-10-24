import express from 'express'
import { FileController } from './file.controller'
import { uploadMiddleware } from '../../middleware/multerMiddleware'

const router = express.Router()

router.post(
  '/create',
  uploadMiddleware,
  FileController.createFile,
)

export const FileRoutes = router

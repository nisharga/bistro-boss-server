import express from 'express'
import { MenuController } from './menu.controller'

const router = express.Router()

router.post(
  '/create',
  MenuController.createMenu,
)

export const MenuRoutes = router

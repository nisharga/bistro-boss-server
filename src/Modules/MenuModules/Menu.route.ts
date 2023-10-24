import express from 'express'
import { MenuController } from './menu.controller'

const router = express.Router()

router.get('/get/:id', MenuController.getSingleMenu)
router.post('/create', MenuController.createMenu)
router.get('/getall', MenuController.getAllMenus)
router.patch('/update/:id', MenuController.updateMenu)
router.delete('/delete/:id', MenuController.deleteMenu)

export const MenuRoutes = router

import express from 'express'
import { MenuController } from './menu.controller'
import verifyJWT from '../../middleware/verifyJWT'
import verifyAdmin from '../../middleware/verifyAdmin'

const router = express.Router()

router.get('/get/:id', MenuController.getSingleMenu)
router.post('/create', verifyJWT, verifyAdmin, MenuController.createMenu)
router.get('/getall', MenuController.getAllMenus)
router.patch('/update/:id', MenuController.updateMenu)
router.delete('/delete/:id', MenuController.deleteMenu)

export const MenuRoutes = router

import express from 'express'
import { MenuController } from './menu.controller'
import verifyJWT from '../../middleware/verifyJWT'
import verifyAdmin from '../../middleware/verifyAdmin'

const router = express.Router()
// verifyJWT, verifyAdmin - POST
router.get('/get/:id', MenuController.getSingleMenu)

router.post('/create', MenuController.createMenu)

router.get('/getall', MenuController.getAllMenus)
router.patch('/update/:id', MenuController.updateMenu)
router.delete('/delete/:id', MenuController.deleteMenu)

router.get('/getallmenu', MenuController.getAll)

export const MenuRoutes = router

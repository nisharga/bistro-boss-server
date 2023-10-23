import express from 'express'
import { OrderValidation } from './order.validation'
import validateRequest from '../../middleware/validateRequest'
import { OrderController } from './order.controller'
import verifyJWT from '../../middleware/verifyJWT'

const router = express.Router()

router.post(
  '/create',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder,
)
router.get('/all', OrderController.getAllOrders)
router.get('/single/:id', OrderController.getSingleOrder)
router.patch('/update/:id', OrderController.updateSingleOrder)
router.delete('/delete/:id', OrderController.deleteOrder)

// verify JWT middleware use
router.get(
  '/searchbyemail/:email',
  verifyJWT,
  OrderController.OrderSearchByEmail,
)

export const OrderRoutes = router

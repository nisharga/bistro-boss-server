import express from 'express'
import { paymentController } from './payment.controller'

const router = express.Router()

router.post(
  '/',
  //   validateRequest(SingleUserValidation.createSingleUserZodSchema),
  paymentController.createSinglePayment,
)

router.get('/', paymentController.getAllPayment)

router.patch('/:id', paymentController.updatePayment)

export const PaymentRoutes = router

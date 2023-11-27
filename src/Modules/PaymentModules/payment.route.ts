import express from 'express'
import { paymentController } from './payment.controller'
import verifyJWT from '../../middleware/verifyJWT' 

const router = express.Router()

router.post('/', paymentController.createSinglePayment)

router.get(
  '/searchbyemail/:email',
  verifyJWT,
  paymentController.paymentSearchByEmail,
)

router.get('/', paymentController.getAllPayment)

router.get('/admindashboard', verifyJWT, paymentController.adminDashboard)

router.patch('/:id', paymentController.updatePayment)

export const PaymentRoutes = router

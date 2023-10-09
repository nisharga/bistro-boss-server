import express from 'express';
import { OrderValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
import { OrderController } from './user.controller';

const router = express.Router();

router.post(
    '/create', 
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
)
router.get(
    '/all', 
    OrderController.getAllOrders
)
router.get(
    '/single/:id', 
    OrderController.getSingleOrder
)
router.patch(
    '/update/:id', 
    OrderController.updateSingleOrder
)
router.delete(
    '/delete/:id', 
    OrderController.deleteOrder
)
 

export const OrderRoutes = router;
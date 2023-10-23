import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SingleUserValidation } from './single.user.validation'
import { SingleUserController } from './single.user.controller'
import verifyJWT from '../../middleware/verifyJWT'
import verifyAdmin from '../../middleware/verifyAdmin'

const router = express.Router()

router.post(
  '/',
  validateRequest(SingleUserValidation.createSingleUserZodSchema),
  SingleUserController.createSingleUser,
)

router.post('/jwtcreate', SingleUserController.createJWT)
router.get('/admin/:email', verifyJWT, SingleUserController.getAdminEmail)

router.get('/', SingleUserController.getAllUsers)
router.patch('/:id', SingleUserController.updateSingleUser)
router.delete('/:id', SingleUserController.deleteSingleUser)

export const UserRoutes = router

import express from 'express'
import { OrderRoutes } from '../Modules/OrderModules/order.route'
import { UserRoutes } from '../Modules/SingleUserModules/single.user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router

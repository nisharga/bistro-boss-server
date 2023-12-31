import express from 'express'
import { OrderRoutes } from '../Modules/OrderModules/order.route'
import { UserRoutes } from '../Modules/SingleUserModules/single.user.route'
import { FileRoutes } from '../Modules/FileModules/file.route'
import { MenuRoutes } from '../Modules/MenuModules/Menu.route'
import { PaymentRoutes } from '../Modules/PaymentModules/payment.route'
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
  {
    path: '/file',
    route: FileRoutes,
  },
  {
    path: '/menu',
    route: MenuRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router

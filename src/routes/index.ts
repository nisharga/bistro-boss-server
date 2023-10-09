 import express from 'express';
import { OrderRoutes } from '../Modules/UserModules/user.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/order',
        route: OrderRoutes,
    },
]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
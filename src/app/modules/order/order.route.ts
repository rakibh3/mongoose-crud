import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// ORDERS ROUTERS
router.put('/users/:userId/orders', OrderController.updateUserOrder);

export const OrderRouter = router;

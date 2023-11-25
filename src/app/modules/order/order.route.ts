import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// ORDERS ROUTERS
router.put('/users/:userId/orders', OrderController.updateUserOrder);
router.get('/users/:userId/orders', OrderController.getUserOrder);
router.get(
  '/users/:userId/orders/total-price',
  OrderController.totalPriceForSpecificUser,
);

export const OrderRouter = router;

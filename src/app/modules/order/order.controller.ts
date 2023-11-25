import { Request, Response } from 'express';
import { OrderService } from './order.service';

// Create orders for a specific id
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { productName, price, quantity } = req.body;

    const order = await OrderService.updateUserOrderInDatabase(
      userId,
      productName,
      price,
      quantity,
    );

    if (order) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Get all orders for a specific id
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userOrder = await OrderService.getUserOrdersFromDatabase(userId);

    if (userOrder) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: userOrder,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const OrderController = {
  updateUserOrder,
  getUserOrder,
};

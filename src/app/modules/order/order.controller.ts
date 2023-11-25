import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { userOrderValidationSchema } from '../user/user.validation';

// Create orders for a specific user ID
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { productName, price, quantity } = req.body;

    // Validate user input using Zod schema
    const orderValidationResult = userOrderValidationSchema.safeParse({
      productName,
      price,
      quantity,
    });

    // Handle invalid input
    if (!orderValidationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: orderValidationResult.error,
      });

      return;
    }

    // Process valid input and update user order
    const order = await OrderService.updateUserOrderInDatabase(
      userId,
      productName,
      price,
      quantity,
    );

    // Respond based on order creation result
    if (order) {
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: 'An Error Occurred On Server.',
      error: {
        code: 500,
        message: 'Internal Server Error',
      },
    });
  }
};

// Get all orders for a specific user ID
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userOrder = await OrderService.getUserOrdersFromDatabase(userId);

    // Respond with fetched orders or user not found error
    if (userOrder) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: userOrder,
      });
    } else {
      res.status(400).json({
        // Handle server error
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An Error Occurred On Server.',
      error: {
        code: 500,
        message: 'Internal Server Error',
      },
    });
  }
};

// Get total order price for a specific user ID
const totalPriceForSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const totalPrice =
      await OrderService.calculateTotalOrderPriceFromDatabase(userId);

    // Respond with the total price or user not found
    if (totalPrice) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: totalPrice,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      // Handle server error
      success: false,
      message: 'An Error Occurred On Server.',
      error: {
        code: 500,
        message: 'Internal Server Error',
      },
    });
  }
};

export const OrderController = {
  updateUserOrder,
  getUserOrder,
  totalPriceForSpecificUser,
};

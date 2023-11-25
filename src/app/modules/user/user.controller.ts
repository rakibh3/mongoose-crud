import { Request, Response } from 'express';
import { UserService } from './user.service';

// Create the user in the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;
    const createdUser = await UserService.createUserInDatabase(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: createdUser,
    });
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

// Get all users from database
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserService.getAllUserFromDatabase();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: allUsers,
    });
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

// Get single user from database
const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserService.getSingleUserByIdFromDatabase(userId);

    if (user) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
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

// Get all users from database
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const deleteUser = await UserService.deleteUserFromDatebase(userId);

    if (deleteUser?.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
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

export const UserController = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
};

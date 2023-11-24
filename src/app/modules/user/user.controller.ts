import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

    // Create the user in the database
    const createdUser = await UserService.createUserInDatabase(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: createdUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create user. Please try again later.',
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
    console.error(error);
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
    console.error(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUser,
};

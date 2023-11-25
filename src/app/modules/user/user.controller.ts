import { Request, Response } from 'express';
import { UserService } from './user.service';
import userValidationSchema from './user.validation';

// Create a new user in the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

    // Validate user input using the defined Zod schema
    const userValidationResult = userValidationSchema.parse(userData);

    // Create the validated user in the database
    const createdUser =
      await UserService.createUserInDatabase(userValidationResult);

    // Respond with success message and created user data
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: createdUser,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: 'An Error Occurred On Server.',
      error: error,
    });
  }
};

// Get all users from database
const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users from the UserService
    const allUsers = await UserService.getAllUserFromDatabase();

    // Respond with a success message and the retrieved user data
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
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Fetch the user by their ID using the UserService
    const user = await UserService.getSingleUserByIdFromDatabase(userId);

    // If the user exists, send a success response with the user data
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

// Delete a user from the database
const deleteUser = async (req: Request, res: Response) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Delete the user using the UserService
    const deleteUser = await UserService.deleteUserFromDatebase(userId);

    // If the user is found and deleted, respond with success
    if (deleteUser?.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      // If user is not found, send a 404 error response
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

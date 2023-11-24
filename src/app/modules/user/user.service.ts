import { IUser } from './user.interface';
import { User } from './user.model';

// Function to create a user in the database
const createUserInDatabase = async (userData: IUser) => {
  const createdUser = await User.create(userData);
  return createdUser;
};

// Function to get all users in the database
const getAllUserFromDatabase = async () => {
  const allUser = await User.find(
    {},
    { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return allUser;
};

// Function to get single user from database
const getSingleUserByIdFromDatabase = async (userId: string) => {
  const user = await User.isUserExists(userId);

  if (user) {
    return User.findOne(
      { userId },
      {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    );
  } else {
    return null;
  }
};

export const UserService = {
  createUserInDatabase,
  getAllUserFromDatabase,
  getSingleUserByIdFromDatabase,
};

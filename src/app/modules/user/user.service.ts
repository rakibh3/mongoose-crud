import { IUser } from './user.interface';
import { User } from './user.model';

// Function to create a user in the database
const createUserInDatabase = async (userData: IUser) => {
  const newUserWithPasswordInfo = await User.create(userData);

  const createdUser = await User.findById(newUserWithPasswordInfo.userId, {
    password: 0,
    orders: 0,
    _id: 0,
  });
  return createdUser;
};

// Function to get all users in the database
const getAllUserFromDatabase = async () => {
  const allUser = await User.find(
    {},
    {
      _id: 0,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
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
        isActive: 1,
        hobbies: 1,
        email: 1,
        address: 1,
      },
    );
  }
};

// Delete a user
const deleteUserFromDatebase = async (userId: string) => {
  const user = await User.isUserExists(userId);

  if (user) {
    const deletionResult = await User.deleteOne({ userId });
    return deletionResult;
  }
};

// Update user info
const updateUserFromDatebase = async (
  userId: string,
  userValidationResult: IUser,
) => {
  const user = await User.isUserExists(userId);
  // console.log(user?.userId);

  if (user) {
    const updatedUserInfo = await User.findOneAndUpdate(
      { userId: user.userId },
      { $set: userValidationResult },
      { new: true },
    );
    // return updatedUserInfo;

    const getUserInfoWithoutPassword = await User.findById(updatedUserInfo, {
      password: 0,
      orders: 0,
      _id: 0,
    });

    return getUserInfoWithoutPassword;
  }
};

export const UserService = {
  createUserInDatabase,
  getAllUserFromDatabase,
  getSingleUserByIdFromDatabase,
  updateUserFromDatebase,
  deleteUserFromDatebase,
};

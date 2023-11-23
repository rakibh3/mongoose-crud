import { User } from './user.interface';
import { UserModel } from './user.model';

const creatUserToDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserService = {
  creatUserToDB,
};

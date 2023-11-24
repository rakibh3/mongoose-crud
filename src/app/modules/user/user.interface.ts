import { Model } from 'mongoose';

export interface IUserName {
  firstName: string;
  lastName: string;
}

export interface IUserAddress {
  street: string;
  city: string;
  country: string;
}

export interface IUserOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IUserAddress;
  orders: Array<IUserOrder>;
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<IUser | null>;
}

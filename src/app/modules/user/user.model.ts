import { Schema, model } from 'mongoose';
import {
  IUser,
  IUserName,
  IUserAddress,
  IUserOrder,
  UserModel,
} from './user.interface';

// Schema for UserName
const UserNameSchema = new Schema<IUserName>(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  { _id: false },
);

// Schema for UserAddress
const UserAddressSchema = new Schema<IUserAddress>(
  {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  { _id: false },
);

// Schema for UserOrder
const UserOrderSchema = new Schema<IUserOrder>(
  {
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
  },
  { _id: false },
);

// Schema for User
const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: { type: UserNameSchema, required: [true, 'Full name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'Active status is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: UserAddressSchema, required: [true, 'Address is required'] },
  orders: { type: [UserOrderSchema] },
});

userSchema.statics.isUserExists = async function (userId: string) {
  const exixtingUser = await User.findOne({ userId });
  return exixtingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);

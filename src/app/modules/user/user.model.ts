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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false },
);

// Schema for UserAddress
const UserAddressSchema = new Schema<IUserAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

// Schema for UserOrder
const UserOrderSchema = new Schema<IUserOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

// Schema for User
const userSchema = new Schema<IUser, UserModel>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: UserNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true, default: undefined },
  address: { type: UserAddressSchema, required: true },
  orders: { type: [UserOrderSchema], default: undefined },
});

userSchema.statics.isUserExists = async function (userId: string) {
  const exixtingUser = await User.findOne({ userId });
  return exixtingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);

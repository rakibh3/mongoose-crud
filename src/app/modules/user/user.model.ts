import { Schema, model } from 'mongoose';
import { User, UserName, UserAddress, UserOrder } from './user.interface';

// Schema for UserName
const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Schema for UserAddress
const UserAddressSchema = new Schema<UserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// Schema for UserOrder
const UserOrderSchema = new Schema<UserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Schema for User
const userSchema = new Schema<User>({
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

export const UserModel = model<User>('User', userSchema);

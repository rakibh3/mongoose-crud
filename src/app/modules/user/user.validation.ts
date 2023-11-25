import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const userOrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema),
});

export default userValidationSchema;

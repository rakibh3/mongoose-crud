import { User } from '../user/user.model';

// Function for create order for specific user
const updateUserOrderInDatabase = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number,
) => {
  const user = await User.isUserExists(userId);

  if (user) {
    const updateUserOrder = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: { productName, price, quantity } } },
    );
    return updateUserOrder;
  }
};

// Function for retrieve all orderss for a specific user
const getUserOrdersFromDatabase = async (userId: string) => {
  const user = await User.isUserExists(userId);

  if (user) {
    const userOrders = await User.findOne({ userId }, { _id: 0, orders: 1 });
    return userOrders;
  }
};

export const OrderService = {
  updateUserOrderInDatabase,
  getUserOrdersFromDatabase,
};

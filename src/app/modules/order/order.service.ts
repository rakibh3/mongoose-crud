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

// Function for calculate price of orders for specific user
const calculateTotalOrderPriceFromDatabase = async (userId: string) => {
  const user = await User.isUserExists(userId);

  if (user) {
    const totalOrderPrice = await User.aggregate([
      { $match: { userId: user.userId } }, // Match the user by userId
      { $unwind: { path: '$orders' } }, // Unwind the orders array
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      { $project: { _id: 0, totalPrice: 1 } },
    ]);
    return totalOrderPrice;
  }
};

export const OrderService = {
  updateUserOrderInDatabase,
  getUserOrdersFromDatabase,
  calculateTotalOrderPriceFromDatabase,
};

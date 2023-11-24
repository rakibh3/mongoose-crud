import { User } from '../user/user.model';

const updateUserOrderInDatabase = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number,
) => {
  const user = await User.isUserExists(userId);

  if (user) {
    const updateUserOrder = await User.findOneAndUpdate({
      $push: { orders: { productName, price, quantity } },
    });
    return updateUserOrder;
  }
};

export const OrderService = {
  updateUserOrderInDatabase,
};

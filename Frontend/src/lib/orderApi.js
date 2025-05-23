import api from "../utils/interceptor";

export const OrderPlace = async (cartData) => {
  try {
    const response = await api.post("/order/orderplace", { cartData });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

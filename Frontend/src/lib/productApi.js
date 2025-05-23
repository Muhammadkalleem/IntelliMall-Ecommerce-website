import api from "../utils/interceptor";

//  Login Api

export const GetProduct = async () => {
  try {
    const response = await api.get("/product/list");

    return response;
  } catch (error) {
    console.error(
      "Get Product failed:",
      error.response?.data?.message || error.message
    );
  }
};

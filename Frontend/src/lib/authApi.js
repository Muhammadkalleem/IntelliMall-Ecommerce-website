import api from "../utils/interceptor";

//  Login Api

export const userLogin = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
  }
};

// Register Api

export const userRegister = async (name, email, password) => {
  try {
    const response = await api.post("/user/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Register Failed",
      error.response?.data?.message || error.message
    );
  }
};
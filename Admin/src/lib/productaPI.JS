import api from "../utils/interceptor";

//  Login Api

export const adminLogin = async (email, password) => {
    console.log(email , password);
    
  try {
    const response = await api.post("/user/admin-login", { email, password });
    console.log(response);
    
    const { token } = response.data;

    localStorage.setItem("adminToken", token);

    return response;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
  }
};

// Register Api
export const addProduct = async (formData) => {
    console.log("FormData:", [...formData.entries()]); // Debugging: Log FormData content

    try {
        const response = await api.post("/product/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Let browser set boundaries
            },
        });
        console.log("Response:", response);
        return response;
    } catch (error) {
        console.error("Register Failed", error.response?.data?.message || error.message);
    }
};

import AdminDashboard from "./AdminDashboard";
const API_BASE_URL = "http://localhost:4000/api/user"; // ✅ Update to match backend

export const adminLogin = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Error during login:", error);
        return { success: false, message: error.message };
    }
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = "IntelliMall3@gmail.com";
const ADMIN_PASSWORD = "IntelliMall3";
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable

export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // ✅ Generate a token with expiration time (e.g., 1 hour)
            const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });

            return res.json({ success: true, token, message: "Admin login successful" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error in AdminLogin:", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

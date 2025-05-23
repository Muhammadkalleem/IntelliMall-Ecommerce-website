import React, { useState } from "react";
import axios from "axios";
import { backendurl } from "../App"; // ✅ Ensure `backendurl` is correctly imported
import { toast } from "react-toastify"; // ✅ Import `toast`
import "react-toastify/dist/ReactToastify.css"; // ✅ Import CSS for Toast
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../lib/productaPI.JS";
// ✅ Ensure correct import

export default function Login() {
  // ✅ Updated prop name to camelCase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const LoginHandler = async () => {
    console.log(email, password);

    try {
      const response = await adminLogin(email, password);

      if (response?.data?.token) {
        console.log("response", response);
        localStorage.setItem("adminToken", response.data.token); // ✅ Store correct token
        navigate("/");
        window.location.reload(); // ✅ Reload to trigger token check in `App.js`
      } else {
        toast.error("Login failed! Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <div className="mb-3 min-w-72">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Email Address
          </p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            type="email"
            placeholder="Enter your email"
            id="email"
            required
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            type="password"
            placeholder="Enter your password"
            id="email"
            required
          />
        </div>
        <button
          className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
          onClick={() => LoginHandler()}
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

export const backendurl = import.meta.env.VITE_API_BASE_URL;
export const currency = "$";



export default function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken"); // ✅ Remove token if null (logout)
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {!token ? (  // ✅ Fix: Correct token check
        <Login setToken={setToken} />  
      ) : (
        <>
          <Navbar setToken={setToken} /> 
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <h1 className="text-2xl text-center font-bold mb-5">
                Welcome to IntelliMall Admin Panel
              </h1>

              <Routes>
                <Route path="/" element={<Navigate to="/list" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

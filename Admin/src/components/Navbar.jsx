import React from "react";
import { assets } from "../assets/assets"; // ✅ Ensure the path is correct

export default function Navbar({ setToken }) {  
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token from localStorage
    setToken(null); // ✅ Update state to trigger logout
  };

  return (
    <div className="flex items-center justify-between py-2 px-[4%] bg-gray-100 shadow-md">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
      <button 
        onClick={handleLogout} 
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
}

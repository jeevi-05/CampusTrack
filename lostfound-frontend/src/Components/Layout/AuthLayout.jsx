// src/Components/Layout/AuthLayout.jsx
import React from "react";
import Navbar from "./Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;

import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaSearch, FaEdit, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { getUserDetails } from "../../Services/LoginService";

const StudentMenu = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUserDetails()
      .then(res => setCurrentUser(res.data))
      .catch(err => console.error("Error fetching current user:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col font-sans">

      {/* ✅ Common Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-full max-w-[75%] mx-auto flex-1 flex flex-col justify-between">

        {/* Welcome Card */}
        <div
          className="relative rounded-2xl shadow-2xl p-16 text-center text-white mb-12 overflow-hidden scale-95"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative z-10">
            <div className="inline-block bg-white/20 p-6 rounded-full mb-6">
              <span className="text-6xl">🎓</span>
            </div>

            <h1 className="text-5xl font-bold mb-2 drop-shadow-md">
              Welcome Student!
            </h1>

            <p className="text-xl mb-6 opacity-90">
              Track and report lost & found items easily
            </p>

            <div className="inline-block bg-white/15 py-2 px-8 rounded-full backdrop-blur-md text-center">
              <p className="text-lg font-medium py-2">
                Username: <strong>{currentUser?.username || "student"}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">

          {/* View Items */}
          <div
            onClick={() => navigate("/post-report")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3 text-purple-600">
              <FaSearch />
            </div>
            <h3 className="text-lg font-semibold mb-1">View Items</h3>
            <p className="text-gray-500">Browse all lost & found posts</p>
          </div>

          {/* Report Lost */}
          <div
            onClick={() => navigate("/lost-entry")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3 text-blue-600">
              <FaEdit />
            </div>
            <h3 className="text-lg font-semibold mb-1">Report Lost</h3>
            <p className="text-gray-500">Submit details of your lost item</p>
          </div>

          {/* Report Found */}
          <div
            onClick={() => navigate("/found-entry")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3 text-green-600">
              <FaBoxOpen />
            </div>
            <h3 className="text-lg font-semibold mb-1">Report Found</h3>
            <p className="text-gray-500">Submit an item you found on campus</p>
          </div>

          {/* Chat Messages */}
          <div
            onClick={() => navigate("/chat-msg")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3 text-yellow-600">
              <FaComments />
            </div>
            <h3 className="text-lg font-semibold mb-1">Chat Messages</h3>
            <p className="text-gray-500">Open the chat interface</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentMenu;

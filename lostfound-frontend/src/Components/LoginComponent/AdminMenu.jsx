import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import {
  getAllUsers,
  getCounts,
  getUserDetails,
} from "../../Services/LoginService";
import { getAllMatchItems } from "../../Services/MatchItemService";

const AdminMenu = () => {
  const navigate = useNavigate();

  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Lost & Found counts
    getCounts().then((res) => {
      setLostCount(res.data.lost);
      setFoundCount(res.data.found);
    });

    // User count
    getAllUsers().then((res) => {
      setUserCount(res.data.length);
    });

    // Matched items count
    getAllMatchItems().then((res) => {
      setMatchCount(res.data.length);
    });

    // Logged in user details
    getUserDetails().then((res) => {
      setCurrentUser(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-sans flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-full max-w-[75%] mx-auto flex-1 flex flex-col">
        {/* Welcome Card */}
        <div
          className="relative rounded-2xl shadow-2xl p-14 text-center text-white mb-12 overflow-hidden scale-95"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative z-10">
            <div className="inline-block bg-white/20 p-6 rounded-full mb-6">
              <span className="text-6xl">🎓</span>
            </div>

            <h1 className="text-5xl font-bold mb-2 drop-shadow-md">
              Campus Administration
            </h1>

            <p className="text-xl mb-6 opacity-90">
              Intelligent Lost and Found Locator for Your Campus
            </p>

            <div className="inline-block bg-white/15 py-2 px-8 rounded-full backdrop-blur-md">
              <p className="text-lg font-medium py-2">
                Username:{" "}
                <strong>{currentUser?.username || "ADMIN"}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {/* Manage Posts */}
          <div
            onClick={() => navigate("/post-report")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-1">Manage Posts</h3>
            <p className="text-gray-500 mb-3">Lost & Found Overview</p>
            <p className="font-bold text-purple-700">
              Lost: {lostCount}
            </p>
            <p className="font-bold text-purple-700">
              Found: {foundCount}
            </p>
          </div>

          {/* User Management */}
          <div
            onClick={() => navigate("/students")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold mb-1">User Management</h3>
            <p className="text-gray-500 mb-3">
              Manage student accounts
            </p>
            <p className="font-bold text-green-600">
              Total Users: {userCount}
            </p>
          </div>

          {/* Matched Items */}
          <div
            onClick={() => navigate("/matched-items")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="text-lg font-semibold mb-1">
              Matched Items
            </h3>
            <p className="text-gray-500 mb-3">
              Successfully linked items
            </p>
            <p className="font-bold text-blue-700">
              Total Matches: {matchCount}
            </p>
          </div>

          {/* Chat */}
          <div
            onClick={() => navigate("/chat-msg")}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold mb-1">Chat</h3>
            <p className="text-gray-500 mb-3">
              Communicate with students
            </p>
            <p className="font-bold text-red-600">Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

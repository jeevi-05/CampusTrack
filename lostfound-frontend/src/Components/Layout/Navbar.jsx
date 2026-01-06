import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, getUserDetails } from "../../Services/LoginService";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => navigate("/"));
  };

  // Admin Links
  const renderAdminLinks = () => {
    const path = location.pathname;
    if (path === "/AdminMenu") return null;

    if (path === "/post-report") {
      return (
        <>
          <button
            onClick={() => navigate("/AdminMenu")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Admin Menu
          </button>
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Users
          </button>
        </>
      );
    }

    if (path === "/students") {
      return (
        <>
          <button
            onClick={() => navigate("/AdminMenu")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Admin Menu
          </button>
          <button
            onClick={() => navigate("/post-report")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Manage Posts
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={() => navigate("/AdminMenu")}
          className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
        >
          Admin Menu
        </button>
        <button
          onClick={() => navigate("/students")}
          className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
        >
          Users
        </button>
      </>
    );
  };

  // Student Links
  const renderStudentLinks = () => {
    const path = location.pathname;
    if (path === "/StudentMenu") return null;

    if (path === "/lost-report" || path === "/post-report") {
      return (
        <>
          <button
            onClick={() => navigate("/StudentMenu")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            StudentMenu
          </button>
          <button
            onClick={() => navigate("/lost-entry")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Report Lost
          </button>
          <button
            onClick={() => navigate("/found-entry")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Report Found
          </button>
        </>
      );
    }

    if (path === "/lost-entry") {
      return (
        <>
          <button
            onClick={() => navigate("/StudentMenu")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            StudentMenu
          </button>
          <button
            onClick={() => navigate("/post-report")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            View Items
          </button>
          <button
            onClick={() => navigate("/found-entry")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Report Found
          </button>
        </>
      );
    }

    if (path === "/found-entry") {
      return (
        <>
          <button
            onClick={() => navigate("/StudentMenu")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            StudentMenu
          </button>
          <button
            onClick={() => navigate("/lost-entry")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            Report Lost
          </button>
          <button
            onClick={() => navigate("/post-report")}
            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-medium transition"
          >
            View Items
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 text-white shadow-lg"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      {/* Logo */}
      <h1
        onClick={() => navigate(user?.role === "Admin" ? "/AdminMenu" : "/StudentMenu")}
        className="text-2xl font-bold cursor-pointer tracking-wide"
      >
        🎓 CampusTrack
      </h1>

      {/* Links aligned to right */}
      <nav className="flex items-center gap-4 ml-auto">
        {user?.role === "Admin" && renderAdminLinks()}
        {user?.role === "Student" && renderStudentLinks()}
      </nav>

      {/* Profile Dropdown */}
      <div className="relative ml-4" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <FaUserCircle size={30} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-xl overflow-hidden border border-gray-200 bg-gray-100/30 backdrop-blur-md">
            {/* Profile Header */}
            <div className="flex flex-col items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <FaUserCircle size={36} className="mb-1" />
              <p className="text-sm font-semibold">{user?.username}</p>
              <span className="text-[9px] bg-white/25 px-2 py-0.5 rounded-full mt-1 font-medium">
                {user?.role}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Email & Personal Name */}
            <div className="px-4 py-2 space-y-1">
              <div className="bg-gray-200/30 rounded-lg shadow-sm px-2 py-1 backdrop-blur-sm">
                <p className="text-gray-500 font-medium text-[9px]">Email</p>
                <p className="text-gray-800 text-xs break-all font-medium">{user?.email}</p>
              </div>
              <div className="bg-gray-200/30 rounded-lg shadow-sm px-2 py-1 backdrop-blur-sm">
                <p className="text-gray-500 font-medium text-[9px]">Personal Name</p>
                <p className="text-gray-800 text-xs font-medium">{user?.personalName}</p>
              </div>
            </div>

            {/* Logout with glass effect */}
            <div className="px-4 py-2 flex justify-center">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium px-4 py-1 rounded-xl bg-gray-300/20 backdrop-blur-sm border border-gray-200/30 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

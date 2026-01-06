import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { getAllStudents, getRole, deleteUser } from "../../Services/LoginService";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [role, setRole] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ show: false, username: "" });
  const navigate = useNavigate();

  const loadRole = async () => {
    try {
      const res = await getRole();
      setRole(res.data); 
    } catch (err) {
      console.error("Error fetching role:", err);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    loadRole();
    loadStudents();
  }, []);

  const handleDeleteClick = (username) => {
    setConfirmDelete({ show: true, username });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(confirmDelete.username);
      setStudents(students.filter((s) => s.username !== confirmDelete.username));
      setSuccessMsg(`User '${confirmDelete.username}' deleted successfully!`);
      setConfirmDelete({ show: false, username: "" });
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
      setConfirmDelete({ show: false, username: "" });
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, username: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <Navbar />

      <div className="p-10 flex justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="w-full max-w-6xl bg-white/95 rounded-3xl shadow-2xl p-10 mt-6 backdrop-blur-md border border-white/40">

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-4 flex items-center justify-center gap-3">
            <FaUserGraduate className="text-purple-700 text-4xl" />
            Student Users
          </h2>

          {/* Success Message */}
          {successMsg && (
            <div className="bg-green-500 text-white text-center font-medium p-3 rounded-lg mb-6 shadow-md">
              {successMsg}
            </div>
          )}

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-900 text-lg">
                  <th className="p-4 font-semibold">Username</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Personal Name</th>
                  <th className="p-4 font-semibold">Role</th>
                  {role === "Admin" && <th className="p-4 text-center font-semibold">Action</th>}
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-purple-50 transition-all text-gray-700"
                    >
                      <td className="p-4 font-semibold">{s.username}</td>
                      <td className="p-4">{s.email}</td>
                      <td className="p-4">{s.personalName}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-white font-medium ${
                            s.role === "Admin" ? "bg-purple-600" : "bg-green-600"
                          }`}
                        >
                          {s.role}
                        </span>
                      </td>
                      {role === "Admin" && (
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteClick(s.username)}
                            className="text-red-600 hover:text-red-800 text-lg"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-10 text-gray-500 text-lg">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/AdminMenu")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all"
            >
              Back to Admin Menu
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmDelete.show && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl w-96 text-center">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete <strong>{confirmDelete.username}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;

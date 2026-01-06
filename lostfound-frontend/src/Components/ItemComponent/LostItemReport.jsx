import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLostItems,
  getLostItemsByUsername,
  deleteLostItemById,
} from "../../Services/LostItemService";
import { getRole } from "../../Services/LoginService";
import MatchItemSearch from "./MatchItemSearch";
import {
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPalette,
  FaTrash,
} from "react-icons/fa";

const LostItemReport = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [selectedLostItem, setSelectedLostItem] = useState(null);
  const [role, setRole] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    getRole().then((res) => {
      setRole(res.data);

      if (res.data === "Admin") {
        getAllLostItems().then((res) => setItemList(res.data));
      } else {
        getLostItemsByUsername().then((res) => setItemList(res.data));
      }
    });
  }, []);

  /* ================= DELETE LOST ITEM ================= */
  const deleteLostItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this lost item?"))
      return;

    deleteLostItemById(id).then(() => {
      alert("Lost item deleted successfully");
      setItemList((prev) =>
        prev.filter((item) => item.lostItemId !== id)
      );
    });
  };

  const returnBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        {role === "Admin" ? "Admin Lost Items" : "My Lost Items"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {itemList.map((item) => (
          <div
            key={item.lostItemId}
            className="bg-white rounded-3xl shadow-lg border hover:scale-105 transition"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white rounded-t-3xl">
              <h2 className="text-xl font-bold">{item.lostItemName}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  item.status ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {item.status ? "Found" : "Not Found"}
              </span>
            </div>

            {/* BODY */}
            <div className="p-4 grid grid-cols-2 gap-2 text-sm">
              <span><FaBox /> Category</span><b>{item.category}</b>
              <span><FaPalette /> Color</span><b>{item.color}</b>
              <span><FaBox /> Brand</span><b>{item.brand}</b>
              <span><FaMapMarkerAlt /> Location</span><b>{item.location}</b>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t flex justify-between text-sm">
              <span><FaUser /> {item.username}</span>
              <span><FaCalendarAlt /> {item.lostDate}</span>
            </div>

            {/* ACTIONS */}
            <div className="flex">
              {!item.status && (
                <button
                  onClick={() => setSelectedLostItem(item)}
                  className="w-1/2 bg-purple-600 text-white py-2 hover:bg-purple-700 rounded-bl-3xl"
                >
                  🔍 Find Match
                </button>
              )}

              <button
                onClick={() => deleteLostItem(item.lostItemId)}
                className={`${
                  item.status ? "w-full rounded-b-3xl" : "w-1/2 rounded-br-3xl"
                } bg-red-600 text-white py-2 hover:bg-red-700`}
              >
                <FaTrash className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MATCH SEARCH COMPONENT */}
      {selectedLostItem && (
        <MatchItemSearch
          lostItem={selectedLostItem}
          onClose={() => setSelectedLostItem(null)}
        />
      )}

      <div className="text-center mt-10">
        <button
          onClick={returnBack}
          className="bg-purple-600 text-white px-8 py-3 rounded-full"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default LostItemReport;

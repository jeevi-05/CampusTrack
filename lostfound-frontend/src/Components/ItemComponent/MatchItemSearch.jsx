import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getAllFoundItems } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const MatchItemSearch = ({ lostItem, onClose }) => {
  const [foundItems, setFoundItems] = useState([]);
  const [matches, setMatches] = useState([]);

  /* ================= FETCH FOUND ITEMS ================= */
  useEffect(() => {
    getAllFoundItems().then((res) => setFoundItems(res.data));
  }, []);

  /* ================= FIND MATCHES ================= */
  useEffect(() => {
    if (!lostItem || foundItems.length === 0) return;

    const fuse = new Fuse(foundItems, {
      keys: ["foundItemName", "category", "color", "brand"],
      threshold: 0.4,
    });

    const result = fuse.search(lostItem.lostItemName);
    setMatches(result.map((r) => r.item));
  }, [lostItem, foundItems]);

  /* ================= CONFIRM MATCH ================= */
  const confirmMatch = (foundItem) => {
    const matchDTO = {
      lostItemId: lostItem.lostItemId,
      foundItemId: foundItem.foundItemId,
      itemName: lostItem.lostItemName,
      category: lostItem.category,
      lostUsername: lostItem.username,
      foundUsername: foundItem.username,
    };

    saveMatchItem(matchDTO).then(() => {
      alert("Match saved successfully");
      onClose();
    });
  };

  if (!lostItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Possible Matches for "{lostItem.lostItemName}"
        </h2>

        {matches.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching items found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((found) => (
              <div
                key={found.foundItemId}
                className="border p-4 rounded-xl shadow"
              >
                <h3 className="font-bold">{found.foundItemName}</h3>
                <p>Found By: {found.username}</p>
                <p>Category: {found.category}</p>
                <p>Color: {found.color}</p>
                <p>Brand: {found.brand}</p>
                <p>Location: {found.location}</p>

                <button
                  onClick={() => confirmMatch(found)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  ✅ Confirm Match
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MatchItemSearch;

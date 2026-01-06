import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import { getAllMatchItems } from "../../Services/MatchItemService";

const MatchedItemList = () => {
  const [matchedItems, setMatchedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMatchItems()
      .then((res) => {
        setMatchedItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matched items", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Navbar />

      <div className="max-w-[85%] mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          🔗 Matched Items List
        </h2>

        {loading ? (
          <p className="text-center text-lg text-gray-600">
            Loading matched items...
          </p>
        ) : matchedItems.length === 0 ? (
          <p className="text-center text-lg text-red-500">
            No matched items found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Item Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Lost By</th>
                  <th className="px-4 py-3 text-left">Found By</th>
                 
                </tr>
              </thead>

              <tbody>
                {matchedItems.map((item, index) => (
                  <tr
                    key={item.matchItemId?.lostItemId + "-" + item.matchItemId?.foundItemId || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{item.itemName}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.lostUsername}</td>
                    <td className="px-4 py-3">{item.foundUsername}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedItemList;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBoxOpen, FaEdit, FaCalendarAlt, FaMapMarkerAlt,
  FaTags, FaPalette, FaTrademark
} from "react-icons/fa";
import { getUserId } from '../../Services/LoginService';
import { generateId, saveLostItem } from '../../Services/LostItemService';
import Navbar from '../Layout/Navbar';
import '../../DisplayView.css';

const LostItemEntry = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [lostItem, setLostItem] = useState({
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [Ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");


  useEffect(() => {
    generateNewId();
    fetchUser();
    setToday();
  }, []);

  const generateNewId = () => {
    generateId().then(res => setNewId(res.data));
  };

  const fetchUser = () => {
    getUserId().then(res => setUserId(res.data));
  };

  const setToday = () => {
    setLdate(new Date().toISOString().split("T")[0]);
  };


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostItem(prev => ({ ...prev, [name]: value }));
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let temp = {};
    let valid = true;

    if (!lostItem.lostItemName.trim()) { temp.lostItemName = "Item Name is required"; valid = false; }
    if (!lostItem.category.trim()) { temp.category = "Category is required"; valid = false; }
    if (!lostItem.color.trim()) { temp.color = "Color is required"; valid = false; }
    if (!lostItem.brand.trim()) { temp.brand = "Brand is required"; valid = false; }
    if (!lostItem.location.trim()) { temp.location = "Location is required"; valid = false; }

    setErrors(temp);
    if (valid) submitLostItem();
  };

  const submitLostItem = () => {
    const payload = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: Ldate,
    };

    saveLostItem(payload)
      .then(() => {
        setSuccessMessage("Lost item submitted successfully!");
        setInfoMessage("");          
        setErrorMessage("");
        setErrors({});
        setSubmitted(true);
      })
      .catch(() => {
        setErrorMessage("Failed to submit lost item. Please try again.");
      });
  };

  const handleAddAnother = () => {
    setLostItem({
      lostItemName: "",
      color: "",
      brand: "",
      category: "",
      location: "",
      status: false,
    });

    setSubmitted(false);
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});
    setInfoMessage("Now you can add your another lost item");

    setToday();
    generateNewId();
  };

  const returnBack = () => navigate("/StudentMenu");


  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-100 to-blue-100">
      <Navbar />

      <div className="flex justify-center p-4">
        <div className="w-full max-w-4xl bg-white/95 rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-4">
            Lost Item Form Submission
          </h2>

          {/* INFO */}
          {infoMessage && (
            <div className="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg text-center font-semibold">
              {infoMessage}
            </div>
          )}

          {/* SUCCESS */}
          {successMessage && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-semibold">
              {successMessage}
            </div>
          )}

          {/* ERROR */}
          {errorMessage && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center font-semibold">
              {errorMessage}
            </div>
          )}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <FaBoxOpen /> Item Id
              </label>
              <input
                value={newId}
                readOnly
                className="w-full p-3 rounded-lg border bg-gray-100"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <FaCalendarAlt /> Lost Date
              </label>
              <input
                type="date"
                value={Ldate}
                disabled={submitted}
                onChange={(e) => setLdate(e.target.value)}
                className="w-full p-3 rounded-lg border"
              />
            </div>

            {/* INPUTS */}
            {[
              { name: "lostItemName", label: "Lost Item Name", icon: <FaEdit />, span: true },
              { name: "category", label: "Category", icon: <FaTags /> },
              { name: "color", label: "Color", icon: <FaPalette /> },
              { name: "brand", label: "Brand", icon: <FaTrademark /> },
              { name: "location", label: "Location", icon: <FaMapMarkerAlt /> },
            ].map((f, i) => (
              <div key={i} className={f.span ? "md:col-span-2" : ""}>
                <label className="flex items-center gap-2 font-semibold mb-2">
                  {f.icon} {f.label}
                </label>
                <input
                  name={f.name}
                  value={lostItem[f.name]}
                  disabled={submitted}
                  onChange={onChangeHandler}
                  className="w-full p-3 rounded-lg border"
                />
                {errors[f.name] && (
                  <p className="text-red-600 text-sm mt-1">{errors[f.name]}</p>
                )}
              </div>
            ))}

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-center gap-6 mt-6">

              {!submitted ? (
                <button
                  type="button"
                  onClick={handleValidation}
                  className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddAnother}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
                >
                  Add Another Lost Item
                </button>
              )}

              <button
                type="button"
                onClick={returnBack}
                className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600"
              >
                Return
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LostItemEntry;

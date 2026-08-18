import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';
import '../../DisplayView.css';

const RegisterPage = () => {
  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createNewUser = async (event) => {
  event.preventDefault();
  try {
    console.debug("Submitting registration payload:", lostFoundUser);
    const resp = await registerNewUser(lostFoundUser);
    console.debug("Registration response:", resp && resp.status);
    // Success
    setErrors({ success: "User registered successfully! Please login.", error: "" });
  } catch (err) {
    console.error("Registration error:", err);
    // Error
    setErrors({ success: "", error: "Registration failed. Please try again." });
  }
};


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLostFoundUser((values) => ({ ...values, [name]: value }));
  
    setErrors((prev) => ({ ...prev, general: "" }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (lostFoundUser.password.length < 5 || lostFoundUser.password.length > 10) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (lostFoundUser.password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }

    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }

    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) createNewUser(event);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-5
      bg-gradient-to-br from-[#667eea] to-[#764ba2] font-[Segoe_UI]"
    >
      <form
        onSubmit={handleValidation}
        className="w-full max-w-lg p-5 rounded-2xl scale-95
          bg-white backdrop-blur-xl border border-white/40
          shadow-[0_20px_35px_rgba(0,0,0,0.20)]"
      >
        {/* Branding */}
        <div className="text-center mb-4">
          <h1 className="text-[2rem] font-bold text-[#333] tracking-wide">
            🎓 CampusTrack
          </h1>
          <p className="text-gray-600 italic text-[0.95rem] mt-1">
            Helping you reunite with what matters most.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[1.4rem] mb-2 font-semibold text-[#4a4a4a]">
          New User Registration
        </h2>

  
     {/* SUCCESS MESSAGE */}
{errors.success && (
  <div className="bg-gradient-to-r from-green-400 to-green-600
    text-white p-3 rounded-lg mb-4 text-center font-medium
    shadow-[0_4px_12px_rgba(72,187,120,0.3)]">
    {errors.success}
  </div>
)}

{/* ERROR MESSAGE */}
{errors.error && (
  <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a52]
    text-white p-3 rounded-lg mb-4 text-center font-medium
    shadow-[0_4px_12px_rgba(255,107,107,0.3)]">
    {errors.error}
  </div>
)}


        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={lostFoundUser.username}
            onChange={onChangeHandler}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          {errors.username && <p className="text-red-500 mt-1 text-sm">{errors.username}</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Enter a strong password"
            value={lostFoundUser.password}
            onChange={onChangeHandler}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Personal Name */}
        <div className="mb-3">
          <input
            type="text"
            name="personalName"
            placeholder="Enter your full name"
            value={lostFoundUser.personalName}
            onChange={onChangeHandler}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          {errors.personalName && <p className="text-red-500 mt-1 text-sm">{errors.personalName}</p>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={lostFoundUser.email}
            onChange={onChangeHandler}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
        </div>

        {/* Role */}
        <div className="mb-3">
          <input
            list="types"
            placeholder="Choose role"
            name="role"
            value={lostFoundUser.role}
            onChange={onChangeHandler}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem] placeholder-gray-400
              focus:outline-none focus:border-[#8c63ff] focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]"
          />
          <datalist id="types">
            <option value="Student" />
            <option value="Admin" />
          </datalist>
          {errors.role && <p className="text-red-500 mt-1 text-sm">{errors.role}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg mb-2 text-white text-[1rem] font-semibold uppercase tracking-wide
            bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]
            shadow-[0_4px_15px_rgba(102,126,234,0.35)]
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(102,126,234,0.5)]"
        >
          Sign Up
        </button>

        {/* Back to Login */}
        <div className="text-center mt-2 text-[0.95rem]">
          <span className="text-black font-medium">Already have an account? </span>
          <span
            onClick={() => navigate("/")}
            className="text-[#8c63ff] font-semibold cursor-pointer hover:underline transition"
          >
            Sign in here
          </span>
        </div>

      </form>
    </div>
  );
};

export default RegisterPage;

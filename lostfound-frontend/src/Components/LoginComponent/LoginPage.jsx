import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const validateLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); 

    try {
      const payload = {
        userId: loginData.username.trim(),
        password: loginData.password,
      };

      const response = await validateUser(payload);

       
      const role =
        typeof response?.data === "string"
          ? response.data
          : response?.data?.role || response?.data?.data; // fallback

      if (role === "Admin") {
        navigate("/AdminMenu");
      } else if (role === "Student") {
        navigate("/StudentMenu");
      } else {
      
        setErrors({ general: "Login ID or Password is incorrect" });
      }
    } catch (err) {
      
      if (err?.response?.status === 401) {
        setErrors({ general: "Login ID or Password is incorrect" });
      } else if (err?.response?.data?.message) {
        
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({
          general: "Login failed. Please try again.",
        });
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((values) => ({ ...values, [name]: value }));
   
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) validateLogin(event);
  };

  const registerNewUser = () => {
    navigate("/Register");
  };

  return (
    <div
      className="
        min-h-screen flex flex-col justify-center items-center px-5 relative
        bg-gradient-to-br from-[#667eea] to-[#764ba2] font-[Segoe_UI]
      "
    >
      <form
        onSubmit={handleValidation}
        className="
          w-full max-w-lg p-8 rounded-2xl
          bg-white backdrop-blur-xl border border-white/40
          shadow-[0_20px_35px_rgba(0,0,0,0.20)]
        "
        aria-live="polite"
      >
        {/* Branding Inside Form */}
        <div className="text-center mb-5">
          <h1 className="text-[2rem] font-bold text-[#333] tracking-wide">
            🎓 CampusTrack
          </h1>
          <p className="text-gray-600 italic text-[0.95rem] mt-1">
            Helping you reunite with what matters most.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[1.4rem] mb-2 font-semibold text-[#4a4a4a]">
          Welcome Back
        </h2>

        {/* GENERAL ERROR BELOW HEADING */}
        {errors.general && (
          <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a52] text-white p-2 rounded-lg mb-4 text-center font-medium shadow-[0_4px_12px_rgba(255,107,107,0.3)]">
            {errors.general}
          </div>
        )}

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={onChangeHandler}
            className="
              w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem]
              placeholder:text-gray-350
              transition-all duration-300
              focus:outline-none focus:border-[#8c63ff]
              focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]
            "
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-red-500 mt-1 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={onChangeHandler}
            className="
              w-full p-2 rounded-lg border border-gray-300 bg-white
              text-gray-700 text-[0.95rem]
              placeholder:text-gray-350
              transition-all duration-300
              focus:outline-none focus:border-[#8c63ff]
              focus:shadow-[0_0_0_3px_rgba(140,99,255,0.25)]
            "
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
          )}
        </div>

        {/* LOGIN Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-2 rounded-lg mb-2 text-white text-[1rem] font-semibold uppercase tracking-wide
            bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]
            shadow-[0_4px_15px_rgba(102,126,234,0.35)]
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(102,126,234,0.5)]
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-700 font-medium text-[0.95rem]">
            New to CampusTrack?{" "}
            <span
              onClick={registerNewUser}
              className="text-[#8c63ff] font-semibold cursor-pointer hover:underline"
            >
              Create your account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

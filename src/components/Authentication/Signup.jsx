import React, { useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🧩 Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });

      if (res.data?.success) {
        setSuccess("Signup successful! Redirecting...");
        console.log("✅ User Signed Up:", res.data);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error(res.data?.message || "Signup failed!");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Server error. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Theme styles
  const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900";
  const card =
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-700"
      : "bg-gray-100 text-gray-900 border-gray-200";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-400";

  // ✨ Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center pt-36 pb-10 transition-all duration-500 ${bg}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative w-full max-w-md rounded-2xl shadow-lg p-10 border ${card}`}
      >
        {/* User Icon */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <FaUserCircle
            className={`text-6xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-lg tracking-widest font-italiana font-semibold mb-10 text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          CREATE ACCOUNT
        </motion.h2>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Name */}
          <div
            className={`flex items-center font-instrument border-b pb-2 ${inputBorder}`}
          >
            <FaUser
              className={`mr-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none ${
                theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Email */}
          <div
            className={`flex items-center font-instrument border-b pb-2 ${inputBorder}`}
          >
            <FaEnvelope
              className={`mr-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none ${
                theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Password */}
          <div
            className={`flex items-center border-b pb-2 ${inputBorder} relative`}
          >
            <FaLock
              className={`mr-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none pr-8 ${
                theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 text-gray-500 hover:text-purple-500 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div
            className={`flex items-center border-b pb-2 ${inputBorder} relative`}
          >
            <FaLock
              className={`mr-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none pr-8 ${
                theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 text-gray-500 hover:text-purple-500 transition"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-instrument text-sm text-center mt-2"
            >
              {error}
            </motion.p>
          )}

          {/* Success Message */}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 font-instrument text-sm text-center mt-2"
            >
              {success}
            </motion.p>
          )}

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`w-full mt-6 py-3 rounded-md font-instrument tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              theme === "dark"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Signing up...
              </>
            ) : (
              "SIGN UP"
            )}
          </motion.button>
        </motion.form>

        {/* Already have account */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 tracking-wider text-sm font-instrument"
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className={`cursor-pointer font-semibold ${
              theme === "dark"
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-800"
            }`}
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}

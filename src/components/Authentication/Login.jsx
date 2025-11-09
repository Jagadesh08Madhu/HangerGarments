import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

export default function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux states
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900";
  const card =
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-700"
      : "bg-gray-100 text-gray-900 border-gray-200";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-400";

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className={`min-h-screen flex items-center justify-center pt-36 transition-all duration-500 ${bg}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative w-full max-w-md rounded-2xl shadow-lg p-10 border ${card}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <FaUserCircle className={`text-6xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-lg tracking-widest font-italiana font-semibold mb-10 text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          CUSTOMER LOGIN
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className={`flex items-center font-instrument border-b pb-2 ${inputBorder}`}>
            <FaEnvelope className={`mr-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none ${
                theme === "dark" ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          <div className={`flex items-center border-b pb-2 ${inputBorder} relative`}>
            <FaLock className={`mr-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full bg-transparent border-none outline-none pr-8 ${
                theme === "dark" ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
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

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-instrument text-sm text-center mt-2">
              {error}
            </motion.p>
          )}

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
                <FaSpinner className="animate-spin" /> Logging in...
              </>
            ) : (
              "LOGIN"
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 tracking-wider text-sm font-instrument"
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className={`cursor-pointer font-semibold ${
              theme === "dark"
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-800"
            }`}
          >
            Sign up
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}

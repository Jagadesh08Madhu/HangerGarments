import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { CiDark } from "react-icons/ci";  
import { MdOutlineLightMode } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [navTop, setNavTop] = useState("top-[35px]");
  const dispatch = useDispatch()

const {isLoggedIn , user} = useSelector((state) =>state.auth)

  // ✅ Handle logout
  const handleLogout = () => {
    dispatch(logout())
  };

  // ✅ Highlight active link
  useEffect(() => {
    if (location.pathname === "/") setActiveLink("Home");
    else if (location.pathname === "/about-us") setActiveLink("About Us");
    else if (location.pathname === "/contact") setActiveLink("Contact");
    else if (location.pathname.startsWith("/shop")) setActiveLink("Shop");
    else setActiveLink("");
  }, [location.pathname]);

  // ✅ Animation variants
  const dropdownAnim = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const mobileMenuAnim = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "100%", opacity: 1, transition: { duration: 0.1 } },
    exit: { width: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setNavTop("top-0");
      else setNavTop("top-[35px]");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`px-5 lg:px-20 py-5 ${navTop} transition-colors duration-300 border-b w-full fixed z-[60] ${
        theme === "dark"
          ? "bg-black text-white border-gray-800"
          : "bg-white text-black border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="font-italiana tracking-widest font-semibold uppercase text-xl cursor-pointer"
        >
          HANGER Garments
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden xl:flex items-center font-instrument tracking-widest gap-10">
          {["Home", "About Us", "Contact"].map((link) => (
            <li
              key={link}
              onClick={() => {
                setActiveLink(link);
                navigate(
                  link === "Home"
                    ? "/"
                    : link === "About Us"
                    ? "/about-us"
                    : "/contact"
                );
              }}
              className={`cursor-pointer px-3 py-1 rounded-md transition-all duration-200 ${
                activeLink === link
                  ? theme === "dark"
                    ? "bg-gray-800 text-yellow-300"
                    : "bg-gray-200 text-gray-900"
                  : "hover:text-gray-400"
              }`}
            >
              {link}
            </li>
          ))}

          {/* Shop Dropdown */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <span
              onClick={() => {
                setActiveLink("Shop");
                navigate("/shop");
              }}
              className={`px-3 py-1 rounded-md transition ${
                activeLink === "Shop"
                  ? theme === "dark"
                    ? "bg-gray-800 text-yellow-300"
                    : "bg-gray-200 text-gray-900"
                  : "hover:text-gray-400"
              }`}
            >
              Shop
            </span>

            <AnimatePresence>
              {shopOpen && (
                <motion.ul
                  {...dropdownAnim}
                  className={`absolute top-8 left-0 rounded-md shadow-md py-2 w-40 border ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {["Men", "Women", "Kids"].map((cat) => (
                    <li
                      key={cat}
                      onClick={() => navigate(`/shop/${cat.toLowerCase()}`)}
                      className={`px-4 py-2 cursor-pointer ${
                        theme === "dark"
                          ? "hover:bg-gray-800 text-white"
                          : "hover:bg-gray-200 text-black"
                      }`}
                    >
                      {cat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          {/* ✅ Account Section */}
          {isLoggedIn ? (
            // Logged in
            <div
              className="relative hidden xl:block"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                className={`font-instrument tracking-widest border px-5 py-2 rounded-md bg-transparent transition ${
                  theme === "dark"
                    ? "hover:bg-gray-800 border-gray-700"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                {user?.name || "User"}
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.ul
                    {...dropdownAnim}
                    className={`absolute right-0 mt-2 rounded-md shadow-md py-2 w-40 border ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <li
                      onClick={() => navigate("/my-orders")}
                      className={`px-4 py-2 cursor-pointer ${
                        theme === "dark"
                          ? "hover:bg-gray-800 text-white"
                          : "hover:bg-gray-200 text-black"
                      }`}
                    >
                      My Orders
                    </li>
                    <li
                      onClick={handleLogout}
                      className={`px-4 py-2 cursor-pointer ${
                        theme === "dark"
                          ? "hover:bg-gray-800 text-white"
                          : "hover:bg-gray-200 text-black"
                      }`}
                    >
                      Logout
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Not logged in
            <div className="hidden xl:flex gap-4 font-instrument tracking-widest">
              <button
                onClick={() => navigate("/login")}
                className={`px-5 py-2 rounded-md border transition ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`px-5 py-2 rounded-md transition ${
                  theme === "dark"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md flex items-center justify-center text-xl transition ${
              theme === "dark"
                ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="light"
                  initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <MdOutlineLightMode />
                </motion.span>
              ) : (
                <motion.span
                  key="dark"
                  initial={{ opacity: 0, rotate: 180, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -180, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <CiDark />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-2xl relative flex items-center justify-center w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <FiX />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <FiMenu />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            {...mobileMenuAnim}
            className={`xl:hidden overflow-hidden min-h-screen absolute top-full left-0 w-full flex flex-col items-center gap-5 py-5 font-instrument tracking-widest border-t ${
              theme === "dark"
                ? "bg-black text-white border-gray-800"
                : "bg-white text-black border-gray-200"
            }`}
          >
            {/* Menu links */}
            {["Home", "About Us", "Contact"].map((link) => (
              <span
                key={link}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                  navigate(
                    link === "Home"
                      ? "/"
                      : link === "About Us"
                      ? "/about-us"
                      : "/contact"
                  );
                }}
                className={`cursor-pointer w-full px-5 py-2 rounded-md transition-all ${
                  activeLink === link
                    ? theme === "dark"
                      ? "bg-gray-800 text-yellow-300"
                      : "bg-gray-200 text-gray-900"
                    : "hover:text-gray-400"
                }`}
              >
                {link}
              </span>
            ))}

            {/* Shop Dropdown (Mobile) */}
            <div className="w-full px-5">
              <button
                className="cursor-pointer flex items-center gap-2 w-full"
                onClick={() => setShopOpen(!shopOpen)}
              >
                Shop <span className="text-sm">{shopOpen ? "▲" : "▼"}</span>
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    {...dropdownAnim}
                    className={`mt-2 border-t ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {["Men", "Women", "Kids"].map((cat) => (
                      <li
                        key={cat}
                        onClick={() => {
                          navigate(`/shop/${cat.toLowerCase()}`);
                          setMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        {cat}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* ✅ Account Section (Mobile) */}
            {isLoggedIn ? (
              <div className="w-full text-center">
                <button
                  className="cursor-pointer flex items-center px-5 gap-2 w-full"
                  onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
                >
                  {user?.name || "user"}
                  <span className="text-sm">
                    {mobileAccountOpen ? "▲" : "▼"}
                  </span>
                </button>

                <AnimatePresence>
                  {mobileAccountOpen && (
                    <motion.ul
                      {...dropdownAnim}
                      className={`mt-2 rounded-md border-t ${
                        theme === "dark"
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <li
                        onClick={() => {
                          navigate("/my-orders");
                          setMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        My Orders
                      </li>
                      <li
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        Logout
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col w-full items-center gap-3 px-5 mt-5">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full border px-5 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="w-full bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
                >
                  Sign Up
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

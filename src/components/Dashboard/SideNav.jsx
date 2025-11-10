import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import {
  FiHome,
  FiBox,
  FiList,
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
  FiStar,
  FiGift,
  FiLogOut,
} from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function SideNav() {
  const { isOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Add Product", path: "/admin/add-product", icon: <FiHome /> },
    { name: "Product", path: "/admin/product", icon: <FiBox /> },
    { name: "Categories", path: "/admin/categories", icon: <FiList /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingBag /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Contact", path: "/admin/contact", icon: <FiMessageSquare /> },
    { name: "Review", path: "/admin/reviews", icon: <FiStar /> },
    { name: "Coupons", path: "/admin/coupons", icon: <FiGift /> },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          key="sidenav"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
          className="
            fixed lg:static 
            top-16 bottom-0 
            lg:w-[20%] 
            bg-white dark:bg-gray-900 
            border-r border-gray-200 dark:border-gray-700 
            lg:flex flex-col gap-10 
            pb-10 pt-4 px-5 
            shadow-lg 
            overflow-y-auto scrollbar-hide
            z-50
          "
        >
          {/* Logo + Close Button */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <h1 className="text-xl lg:text-2xl font-italiana font-bold text-gray-800 dark:text-gray-100">
              Hanger Garments
            </h1>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <MdKeyboardArrowLeft className="text-xl text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-3">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <button
            onClick={() => console.log("Logout clicked")}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium mt-6"
          >
            <FiLogOut /> Logout
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

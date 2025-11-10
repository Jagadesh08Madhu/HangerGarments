import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocation, Link } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useTheme } from "../../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";

export default function AdminNav() {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <section className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side: Sidebar button + Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <RxHamburgerMenu className="text-2xl text-gray-800 dark:text-gray-200" />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center font-instrument text-sm text-gray-500 dark:text-gray-400">
            {pathnames.length === 0 ? (
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Admin Dashboard
              </span>
            ) : (
              <>
                <Link
                  to="/admin"
                  className="font-semibold text-gray-800 dark:text-gray-100 hover:underline"
                >
                  Admin Dashboard
                </Link>
                {pathnames.map((name, index) => {
                  const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                  const isLast = index === pathnames.length - 1;
                  const formattedName =
                    name.charAt(0).toUpperCase() +
                    name.slice(1).replace(/-/g, " ");

                  return (
                    <React.Fragment key={index}>
                      <span className="mx-2">{">"}</span>
                      {isLast ? (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {formattedName}
                        </span>
                      ) : (
                        <Link
                          to={routeTo}
                          className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {formattedName}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        {/* Right side: Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-md flex items-center justify-center text-xl transition shadow-sm ${
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
      </div>
    </section>
  );
}

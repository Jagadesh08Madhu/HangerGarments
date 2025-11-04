import React from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useTheme } from "../../context/ThemeContext"; // ✅ correct import

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {theme === "light" ? (
        <CiDark className="text-xl" />
      ) : (
        <MdOutlineLightMode className="text-xl" />
      )}
    </button>
  );
}

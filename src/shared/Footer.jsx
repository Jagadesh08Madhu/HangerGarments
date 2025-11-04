import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // ⚙️ Replace this with your actual backend API endpoint
  const CATEGORY_API = "https://your-backend-api.com/api/categories";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORY_API);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🎨 Theme-based styles
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const headingColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";

  return (
    <footer
      className={`transition-colors duration-500 ${bgColor} ${textColor} border-t ${borderColor}`}
    >
      <div className=" mx-auto px-5 lg:px-20 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className={`text-XL lg:text-3xl tracking-widest font-italiana font-semibold mb-4 ${headingColor}`}>
            HANGER GARMENTS
          </h3>
          <p className="text-base font-instrument leading-relaxed">
            Hanger Garments brings you the finest collection of fashionwear for
            Men, Women, and Kids. Our mission is to redefine comfort and style
            through quality apparel.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className={`text-xl font-italiana tracking-widest font-semibold mb-4 ${headingColor}`}>
            Quick Links
          </h3>
          <ul className="space-y-2 font-instrument tracking-widest text-base">
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </li>
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/shop")}
            >
              Shop
            </li>
            <li
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Shop by Category (Dynamic) */}
        <div>
          <h3 className={`text-xl font-italiana tracking-widest font-semibold mb-4 ${headingColor}`}>
            Shop by Category
          </h3>
          {categories.length === 0 ? (
            <p className=" text-gray-500 font-instrument tracking-widest text-base">Loading categories...</p>
          ) : (
            <ul className="space-y-2 font-instrument tracking-widest text-base">
              {categories.map((cat) => (
                <li
                  key={cat.id || cat._id}
                  onClick={() => navigate(`/shop/${cat.slug || cat.name.toLowerCase()}`)}
                  className="cursor-pointer hover:text-red-500 transition capitalize"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact Details */}
        <div>
          <h3 className={`text-xl font-italiana tracking-widest font-semibold mb-4 ${headingColor}`}>
            Contact
          </h3>
          <ul className="space-y-2 font-instrument tracking-widest text-base ">
            <li>Email: support@hanger.com</li>
            <li>Phone: +91 63807 85706</li>
            <li>Address: Pallavaram, Chennai</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className={`text-center font-instrument tracking-wider py-6 text-base border-t ${borderColor} ${textColor}`}
      >
        © {new Date().getFullYear()} Hanger Garments. All Rights Reserved.
      </div>
    </footer>
  );
}

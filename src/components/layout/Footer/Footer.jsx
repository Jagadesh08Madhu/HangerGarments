import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../context/ThemeContext";
import { useAppSelector } from "../../../redux/hooks";

export default function Footer() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get categories from Redux store
  const { categories, loading, error } = useAppSelector((state) => state.category);

  const CATEGORY_API = "http://localhost:5000/api/category";

  useEffect(() => {
    const fetchCategories = async () => {
      // Only fetch if categories are empty
      if (categories.length === 0) {
        dispatch(startLoading());
        
        try {
          const res = await fetch(CATEGORY_API);
          
          if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
          }
          
          const data = await res.json();
          
          if (data.success && Array.isArray(data.data)) {
            dispatch(setCategories(data.data));
          } else {
            throw new Error("Invalid data format from API");
          }
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          dispatch(setError(err.message));
        }
      }
    };
    
    fetchCategories();
  }, [dispatch, categories.length]);

  // 🎨 Theme-based styles
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const headingColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";

  return (
    <footer
      className={`transition-colors duration-500 ${bgColor} ${textColor} border-t ${borderColor}`}
    >
      <div className="mx-auto px-5 lg:px-20 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          {loading ? (
            <p className="text-gray-500 font-instrument tracking-widest text-base">
              Loading categories...
            </p>
          ) : error ? (
            <p className="text-red-500 font-instrument tracking-widest text-base">
              Failed to load categories
            </p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 font-instrument tracking-widest text-base">
              No categories available
            </p>
          ) : (
            <ul className="space-y-2 font-instrument tracking-widest text-base">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => navigate(`/shop/${cat.name.toLowerCase()}`)}
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
          <ul className="space-y-2 font-instrument tracking-widest text-base">
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
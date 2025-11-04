import React from "react";
import { useTheme } from "../../context/ThemeContext"; 
import tshirt from "../../assets/categories/tshirt.webp";
import oversized from "../../assets/categories/oversized.webp";
import polo from "../../assets/categories/polo.webp";
import hoodie from "../../assets/categories/hoodie.webp";

export default function BestSeller() {
  const { theme } = useTheme();

  const products = [
    {
      id: 1,
      title: "FREE SNAP HOOD",
      category: "Outerwear",
      price: "₹161.29",
      image:
        tshirt,
    },
    {
      id: 2,
      title: "COLLAR WOOL JACKET",
      category: "Sneakers",
      price: "₹165.58",
      image:
        oversized,
    },
    {
      id: 3,
      title: "EASE BOMBER VEST",
      category: "Uncategorized",
      price: "₹162.32",
      image:
        polo,
    },
    {
      id: 4,
      title: "DENSE SWEAT",
      category: "Accessories",
      price: "₹146.43",
      image:
        hoodie,
    },
  ];

  // Dynamic styles based on theme
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const subText = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section
      className={`py-12 transition-colors duration-500 ${bgColor}`}
    >
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className={`text-4xl md:text-5xl font-italiana tracking-widest font-bold ${textColor}`}>
          BESTSELLER
        </h2>
        <div className="w-20 h-[2px] bg-red-500 mx-auto mt-2"></div>
      </div>

      {/* Product Grid */}
      <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-16">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex flex-col shadow-2xl  px-5 py-3 ${theme === "dark" ? "shadow-gray-800" : ""} items-start text-left group`}
          >
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <p className={`${subText} font-instrument text-sm mt-2`}>In Stock</p>
            <h3 className={`${textColor} font-italiana tracking-widest font-semibold text-base lg:text-lg mt-1`}>
              {product.title}
            </h3>
            <p className={`${subText} text-sm font-instrument mt-1`}>{product.category}</p>
            <p className={`${textColor} font-medium font-instrument tracking-widest mt-1`}>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

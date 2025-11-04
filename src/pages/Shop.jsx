import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // 👈 for dark/light mode toggle

export default function Shop() {
  const { category } = useParams(); // e.g. "men", "women" etc.
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⚙️ Replace this with your actual backend API base URL
  const BASE_URL = "https://your-backend-api.com/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = category
          ? `${BASE_URL}?category=${category}` // Fetch specific category
          : BASE_URL; // Fetch all products

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data); // API should return an array of products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // 🎨 Theme-based colors
  const bg = theme === "dark" ? "bg-black" : "bg-white";
  const text = theme === "dark" ? "text-white" : "text-black";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <section
      className={`py-10 px-6 md:px-16 min-h-screen transition-colors duration-500 ${bg} ${text}`}
    >
      <h1 className="text-3xl font-bold text-center mb-10 capitalize">
        {category ? `${category} Collection` : "All Products"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className={`border rounded-lg overflow-hidden shadow hover:shadow-lg transition ${cardBg}`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <p className="text-gray-400">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

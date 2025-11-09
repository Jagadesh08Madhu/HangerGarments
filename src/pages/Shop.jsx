// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext"; // 👈 for dark/light mode toggle

// export default function Shop() {
//   const { category } = useParams(); // e.g. "men", "women" etc.
//   const { theme } = useTheme();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ⚙️ Replace this with your actual backend API base URL
//   const BASE_URL = "https://your-backend-api.com/api/products";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const url = category
//           ? `${BASE_URL}?category=${category}` // Fetch specific category
//           : BASE_URL; // Fetch all products

//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data); // API should return an array of products
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [category]);

//   // 🎨 Theme-based colors
//   const bg = theme === "dark" ? "bg-black" : "bg-white";
//   const text = theme === "dark" ? "text-white" : "text-black";
//   const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

//   return (
//     <section
//       className={`pb-10 pt-48 px-6 md:px-16 min-h-screen transition-colors duration-500 ${bg} ${text}`}
//     >
//       <h1 className="text-3xl font-bold text-center mb-10 capitalize">
//         {category ? `${category} Collection` : "All Products"}
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((p) => (
//             <div
//               key={p.id}
//               className={`border rounded-lg overflow-hidden shadow hover:shadow-lg transition ${cardBg}`}
//             >
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-semibold">{p.name}</h2>
//                 <p className="text-gray-400">${p.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import tshirt from "../assets/categories/tshirt.webp";
import oversized from "../assets/categories/oversized.webp";
import polo from "../assets/categories/polo.webp";
import hoodie from "../assets/categories/hoodie.webp";
import acidwash from "../assets/categories/acidwash.webp";


export default function Shop() {
  const { category } = useParams();
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fake backend URL (you can replace this later)
  const BASE_URL = "https://your-backend-api.com/api/products";

  // 🧩 Mock data (temporary preview)
  const sampleData = [
    {
      id: 1,
      name: "Men's Round Neck T-Shirt",
      price: 499,
      image: tshirt,
      category: "men",
    },
    {
      id: 2,
      name: "Women's Oversized Tee",
      price: 549,
      image: oversized,     
      category: "women",
    },
    {
      id: 3,
      name: "Classic Polo T-Shirt",
      price: 699,
      image: polo,
      category: "men",
    },
    {
      id: 4,
      name: "Comfy Hoodie",
      price: 999,
      image: hoodie,
      category: "unisex",
    },
    {
      id: 5,
      name: "Women's Crop Sweatshirt",
      price: 799,
      image: acidwash,
      category: "women",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate backend delay
        await new Promise((r) => setTimeout(r, 1000));

        // Instead of API, use filtered sampleData
        const filtered =
          category && category !== "all"
            ? sampleData.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase()
              )
            : sampleData;

        setProducts(filtered);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // 🎨 Theme-based colors
  const isDark = theme === "dark";
  const bg = theme === "dark" ? "bg-black" : "bg-white";
  const text = theme === "dark" ? "text-white" : "text-black";
  const textColor = isDark ? "text-white" : "text-black";
  // const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const subText = isDark ? "text-gray-400" : "text-gray-600";
  


  return (
    <section
      className={`pb-10 pt-44 px-6 min-h-screen transition-colors duration-500 ${bg} ${text}`}
    >
      <h1 className="text-3xl font-bold font-italiana tracking-widest lg:text-5xl text-center mb-10 capitalize">
        {category ? `${category}'s Collections` : "All Products"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
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
      )}
    </section>
  );
}

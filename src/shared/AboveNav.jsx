import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useTheme } from "../context/ThemeContext";

export default function AboveNav() {
  const { theme } = useTheme();
  const [show, setShow] = useState(true);

  // Hide AboveNav on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShow(false);
      else setShow(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 z-40 overflow-hidden transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        theme === "dark"
          ? "bg-gray-900 text-yellow-300 border-b border-gray-700"
          : "bg-gray-100 text-gray-900 border-b border-gray-300"
      }`}
    >
      <div className="w-full py-2 text-sm font-medium tracking-widest">
        <Marquee
          speed={50}           
          pauseOnHover={true} 
          gradient={false}
          autoFill={true} 
        >
          <span className="mx-10">🚚 Free shipping for all orders</span>
          <span className="mx-10">✨ New Arrivals Available</span>
          <span className="mx-10">💳 Secure Payment & Accept all cards</span>
        </Marquee>
      </div>
    </div>
  );
}

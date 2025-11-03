import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import { ThemeProvider } from "../context/ThemeContext";

export default function Main() {
  return (
    <ThemeProvider>
      {/* Apply base background & text color that respond to dark mode */}
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

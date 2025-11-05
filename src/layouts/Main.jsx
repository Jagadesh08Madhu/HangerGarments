import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import AboveNav from "../shared/AboveNav";

export default function Main() {
  return (
    <ThemeProvider>
      {/* Apply base background & text color that respond to dark mode */}
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <AboveNav />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

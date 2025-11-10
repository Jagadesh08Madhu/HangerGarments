import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import AboveNav from "../shared/AboveNav";
import { ThemeProvider } from "../context/ThemeContext";

export default function Main() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().includes("/admin");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {/* ✅ Show only if not admin route */}
        {!isAdminRoute && (
          <>
            <AboveNav />
            <Navbar />
          </>
        )}

        <main>
          <Outlet />
        </main>

        {/* ✅ Optionally hide footer on admin pages too */}
        {!isAdminRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

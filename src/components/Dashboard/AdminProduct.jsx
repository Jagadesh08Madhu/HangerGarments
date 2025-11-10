import React from "react";
import SideNav from "./SideNav";
import { SidebarProvider } from "../../context/SidebarContext";
import AdminNav from "./AdminNav";

export default function AdminProduct() {
  return (
    <SidebarProvider>
      <section className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1">
          <AdminNav />

          <div className="p-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-semibold">Welcome to Dashboard</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage products, categories, orders, and more from here.
            </p>
          </div>
        </div>
      </section>
    </SidebarProvider>
  );
}

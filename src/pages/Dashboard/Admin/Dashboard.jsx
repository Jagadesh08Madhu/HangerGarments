import React from 'react'

const Dashboard = () => {
  return (
      <section className="min-h-screen flex">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className=" text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-semibold">Welcome to Dashboard</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage products, categories, orders, and more from here.
            </p>
          </div>
        </div>
      </section>
  )
}

export default Dashboard
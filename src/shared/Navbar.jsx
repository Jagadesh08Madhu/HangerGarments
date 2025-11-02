import React from 'react'

export default function Navbar() {
  return (
    <section className='px-5 lg:px-20 py-5 bg-gray-900 text-white'>
        <div className='flex items-center justify-between'>
            {/* logo */}
            <div>
                <h1>HANGER</h1>
            </div>
            {/* Nav items */}
            <div>
                <ul className='flex items-center gap-10'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Shop</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                Login
            </div>
        </div>
    </section>
  )
}

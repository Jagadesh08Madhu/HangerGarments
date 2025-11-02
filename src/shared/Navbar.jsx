import React from 'react'

export default function Navbar() {
  return (
    <section className='px-5 lg:px-20 py-5 bg-black text-white'>
        <div className='flex items-center justify-between'>
            {/* logo */}
            <div>
                <h1 className='font-italiana tracking-widest font-semibold uppercase text-xl'>HANGER Garments</h1>
            </div>
            {/* Nav items */}
            <div>
                <ul className='flex items-center font-instrument tracking-widest gap-10'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Shop</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className='font-instrument tracking-widest border px-5 py-2 '>
                Login
            </div>
        </div>
    </section>
  )
}

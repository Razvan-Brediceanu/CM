// src/components/Navbar.js
import React, { useEffect, useState } from 'react'
import { FaBars, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import ProfileIcon from './ProfileIcon' // Import the ProfileIcon component

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const location = useLocation()

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Define a threshold (e.g., 50 pixels) to trigger the sticky behavior.
      const threshold = 50
      setIsSticky(scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // Scroll to the top only if you are already on the home page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navbarStyle = isSticky
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', // Change to your desired background color
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Add a shadow if desired
        zIndex: 100,
      }
    : {}

  return (
    <div className='w-full min-h-[50px]' style={navbarStyle}>
      {/* Your Navbar content */}
      <div className='flex justify-between items-center z-10 text-white bg-gray-700/80 z-50'>
        {/* Mobile menu icon */}
        <div onClick={handleNav} className='sm:hidden cursor-pointer p-4'>
          <FaBars size={20} />
        </div>

        <ul
          className={`${
            nav ? 'block' : 'hidden'
          } sm:flex sm:space-x-4 sm:items-center px-4`}
        >
          <li>
            <Link
              to='/'
              onClick={handleHomeClick}
              className={`${
                location.pathname === '/' ? 'font-bold text-white' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <a href='/#gallery' className='hover:opacity-75'>
              Gallery
            </a>
          </li>
          <li>
            <a href='/#contact' className='hover:opacity-75'>
              Contact
            </a>
          </li>
        </ul>

        <div className='flex justify-between items-center'>
          {/* Add the ProfileIcon component here */}
          <ProfileIcon />

          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-4'
          >
            <FaFacebookF />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-4'
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar

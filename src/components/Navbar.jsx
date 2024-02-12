import React, { useEffect, useState } from 'react'
import { FaBars, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

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
      const threshold = 50
      setIsSticky(scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navbarStyle = isSticky
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 100,
      }
    : {}

  return (
    <div className='w-full min-h-[50px]' style={navbarStyle}>
      <div className='flex justify-between items-center z-10 text-white bg-gray-800 z-50'>
        <div onClick={handleNav} className='sm:hidden cursor-pointer p-4'>
          <FaBars size={24} className='text-white' />
        </div>

        <ul
          className={`${
            nav ? 'block' : 'hidden'
          } sm:flex sm:mr-4 sm:items-center px-4 transition duration-300 ease-in-out`}
        >
          <li>
            <Link
              to='/'
              onClick={() => {
                handleHomeClick()
                handleNav()
              }}
              className={`${
                location.pathname === '/'
                  ? 'font-bold text-white underline'
                  : ''
              } hover:text-gray-300 transition duration-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href='/#gallery'
              onClick={() => handleNav()}
              className='hover:text-gray-300 transition duration-300'
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href='/#contact'
              onClick={() => handleNav()}
              className='hover:text-gray-300 transition duration-300'
            >
              Contact
            </a>
          </li>
        </ul>

        <div className='flex justify-between items-center'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-4 transition duration-300 hover:text-gray-300'
          >
            <FaFacebookF />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-4 transition duration-300 hover:text-gray-300'
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar

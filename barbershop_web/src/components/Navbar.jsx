import React, { useEffect, useState } from 'react';
import { FaBars, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Define a threshold (e.g., 50 pixels) to trigger the sticky behavior.
      const threshold = 50;
      setIsSticky(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    : {};

  return (
    <div className="w-full min-h-[50px]" style={navbarStyle}>
      {/* Your Navbar content */}
      <div className="flex justify-between items-center z-10 text-white bg-gray-700/80 z-50">
        {/* Mobile menu icon */}
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer p-4"
        >
          <FaBars size={20} />
        </div>

        <ul
          className={`${
            nav ? 'block' : 'hidden'
          } sm:flex sm:space-x-4 sm:items-center px-4`}
        >
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="flex justify-between">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

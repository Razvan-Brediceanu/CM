import React from 'react';
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai';
import logo from '../images/logomusat.jpg';

const TopBar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2">
      <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
        <div className="rounded-full overflow-hidden w-16 h-16">
          <img
            src={logo}
            alt="Logo"
            className="object-contain w-full h-full text-[var(--primary-dark)]"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-700 md:ml-2">Musat Signature</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center md:space-x-6">
        <div className="flex items-center px-6 mb-2 md:mb-0">
          <AiOutlineClockCircle size={20} className="mr-2 text-[var(--primary-dark)]" />
          <p className="text-sm text-gray-700">9AM - 5PM</p>
        </div>
        <div className="flex items-center px-6 mb-2 md:mb-0">
          <AiFillPhone size={20} className="mr-2 text-[var(--primary-dark)]" />
          <p className="text-sm text-gray-700">888-888</p>
        </div>
        <a href="https://mero.ro/p/musat-signature?absp=search_autocomplete" target="_blank" rel="noreferrer">
          <button className="custom-button custom-button:hover">Fa-ti o programare</button>
        </a>
      </div>
    </div>
  );
};

export default TopBar;

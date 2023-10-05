import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 py-4">
      <div className="container mx-auto flex flex-col-reverse sm:flex-row justify-between items-center text-center text-white">
        <div className="mt-4 sm:mt-0 sm:order-1 w-full">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.429243778787!2d24.148715100000004!3d45.782627600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c670705bdf18d%3A0x78c8f8d591acd28b!2sMusat%20Signature%20-cursuri%20Frizerie%20Sibiu!5e0!3m2!1sen!2sro!4v1695740303666!5m2!1sen!2sro"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="sm:order-2 text-center w-full">
          <p>&copy; 2023 Musat Signature. All rights reserved.</p>
          <a target="_blank" href="https://icons8.com/icon/xwd6Qdih-uo1/barber-pole" rel="noreferrer">Barber</a> icon by <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
          <p>Contacteaza-ne pe Social Media</p>

          <div className="flex justify-center items-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-4">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-4">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

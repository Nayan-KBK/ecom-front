import React, { useState, useEffect } from "react";
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";


import logo from '../../assets/global/logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl transition-all duration-300 z-50 px-6 py-3 flex justify-between items-center rounded-b-lg shadow-md ${isScrolled ? "bg-gray-800 shadow-lg" : "bg-transperent"
        }`}
    >
      <div className="text-black font-bold text-lg my-0"><img src={logo} alt="Maharashtra-Graphic-logo" height={30} width={120} /></div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-black text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-gray-700 to-gray-900 text-white flex flex-col items-center pt-20 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <button
          className="absolute top-5 right-5 text-white text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <CloseOutlined />
        </button>
        <ul className="flex flex-col space-y-6 text-lg font-medium ">
          <li className="cursor-pointer text-white">Home</li>
          <li className="cursor-pointer text-white">About</li>
          <li className="cursor-pointer text-white">Contact</li>
        </ul>
      </div>




      {/* Desktop Menu */}
      <ul className="hidden lg:flex lg:space-x-8 text-white text-xl font-medium">
        <li className="relative cursor-pointer after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-yellow-200 after:left-0 after:bottom-[-5px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 flex items-center">
          <HomeOutlined className="mr-2" /> Home
        </li>
        <li className="relative cursor-pointer after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-5px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 flex items-center">
          <InfoCircleOutlined className="mr-2" /> About
        </li>
        <li className="relative cursor-pointer flex items-center after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-5px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
          <ContactsOutlined className="mr-2" /> Contact
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;

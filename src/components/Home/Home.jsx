import React, { useState } from 'react'
import Slider from './Slider'
import './Home.css'
import { SearchOutlined } from "@ant-design/icons";
import RecentUploads from './RecentUploads';
import Trending from './Trending';
import OwnerTalk from './Owner';

// import { Icon } from '@iconify-icon/react';

export default function Home() {


  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Products", "Services", "Articles", "Users"];


  return (
    <>
      <div className="home-left banner flex flex-col md:flex-row items-center justify-between px-[5vw] py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">

        {/* Left Section */}
        <div className="w-full md:w-2/3 flex flex-col items-center text-center px-4 sm:px-6 md:px-10 lg:px-20">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl leading-tight">
            Welcome to <strong className="text-yellow-400">Maharashtra Graphics</strong>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-5 leading-7 sm:leading-9 tracking-wide">
            Your one-stop destination for premium designs! <br />
            <span className="text-yellow-300 font-semibold">
              उच्च दर्जाचे ग्राफिक्स आणि क्रिएटिव्हिटी यांचा एकत्रित संगम!
            </span>
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-6 sm:leading-7 tracking-wide mt-3 sm:mt-4">
            We craft designs that speak louder than words. <br />
            आमची कलाकृती तुमच्या व्यवसायासाठी प्रभावी ब्रँडिंग तयार करेल.
          </p>
        </div>

        {/* Right Section (Slider) */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0">
          <Slider />
        </div>

      </div>




      <div className="py-5 text-center bg-gray-200">
        <h1 className="heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
          Recent Uploads
        </h1>
        <RecentUploads />
      </div>




      <div className="py-5 text-center bg-gray-100">
        <h1 className="heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
          Trending Photos
        </h1>
        <Trending />
      </div>


      <div className="py-10">
        <OwnerTalk/>
      </div>


    </>
  )
}



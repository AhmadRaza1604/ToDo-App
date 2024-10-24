import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi'; // Notification Icon
import { FaSearch } from 'react-icons/fa'; // Search Icon
import './Sidebar.css'
import { AiOutlineMenu } from 'react-icons/ai';
const Navbar = (toggler) => {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    // Update time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    return (
        <div className="flex items-center justify-between bg-white h-16 shadow-md fixed left-0 right-0 px-6">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button  id='menu-btn'
                    onClick={toggler.toggler}
          >
                <AiOutlineMenu size={24} />
            </button>
          <div className="text-teal-700 text-3xl font-bold">TO<span className="text-black">DO</span></div>
        {/* Search Bar */}
              {/* Logo */}

        <div className="flex items-center bg-gray-100 p-2 rounded-md w-2/3 md:w-1/3" id='searchbar'>
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search your task here..."
            className="bg-transparent outline-none w-full"
          />
        </div>
  
        {/* Right Section */}
        <div className="flex items-center space-x-6" id='bell'>
          {/* Notification Button */}
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="relative" >
            <FiBell className="text-gray-500 w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
          </button>
  
          {/* Current Date and Time */}
          <div className="text-teal-700" id='date'>
            {currentTime.toDateString()}
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  
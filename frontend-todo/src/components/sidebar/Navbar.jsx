import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggler }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      navigate('/search-result');
      setSearchQuery(''); // Clear the search field after navigation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between bg-white h-16 shadow-md fixed left-0 right-0 px-6">
      <button id="menu-btn" onClick={toggler}>
        <AiOutlineMenu size={24} />
      </button>
      
      <div className="text-teal-700 text-3xl font-bold">
        <Link to={'/dashboard'}>TO<span className="text-black">DO</span></Link>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md w-2/3 md:w-1/3" id="searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search your task here..."
          className="bg-transparent outline-none w-full"
        />
        <button
          onClick={handleSearch}
          className="ml-2 text-gray-400 px-2 py-2 rounded-full hover:bg-teal-500 hover:text-white transition-colors"
          disabled={!searchQuery.trim()}
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center space-x-6" id="bell">
        <div className="text-teal-700" id="date">
          {currentTime.toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
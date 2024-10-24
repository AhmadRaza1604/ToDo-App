import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { jwtDecode } from 'jwt-decode';
import Person from '../../utils/images/Person.png';
import { AiOutlineQuestionCircle } from 'react-icons/ai'; // Icons for Dashboard and Help
import { BsExclamationLg, BsListTask } from 'react-icons/bs'; // Icon for Task Categories
import { GoSignOut } from 'react-icons/go'; // Icon for Task Categories
import { FiSettings } from 'react-icons/fi'; // Icon for Settings
import { BiTask } from 'react-icons/bi'; // Icon for Settings
import { MdDashboard } from 'react-icons/md';

const Sidebar = (isMob, setIsMob) => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    const logout=()=>{
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login if no token is found
  }
    // Function to extract username from the token stored in localStorage
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
        setIsLoggedIn(true);
          const decodedToken = jwtDecode(token);
          setUsername(decodedToken.username || 'User'); // Set the username from the token
          setUserEmail(decodedToken.userEmail || 'abc@gmail.com'); // Set the username from the token
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token'); // Remove invalid token
          navigate('/login'); // Redirect to login if token is invalid
        }
      } else {
        navigate('/login'); // Redirect to login if no token is found
      }
    }, [navigate, isLoggedIn]);
  return (
    <div className={`flex flex-col bg-teal-500 h-full ${isMob.isMob ? 'w-15 mt-16': 'w-64 mt-28'} p-4  fixed rounded-tr-lg rounded-br-lg`}>

      {/* User Info */}
      <div className={`${isMob.isMob ? 'hidden':''}`}>
      <div className="flex flex-col items-center">
        <img
          src={Person}
          alt="User"
          className="rounded-full w-20 h-20 object-cove -mt-14  mb-2 shadow-xl"
        />
        <h2 className="text-white text-lg font-semibold">{username}</h2>
        <p className="text-gray-300 text-sm mb-5">{userEmail}</p>
      </div>
</div>
      {/* Links */}
      <div className="flex-grow">
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }        >
          <MdDashboard size={20} /> {/* Dashboard Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/vital-task"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }        
        >
          <BsExclamationLg size={20} /> {/* Vital Task Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Vital Task</span>
        </NavLink>
        <NavLink
          to="/my-task"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }        
        >
          <BiTask size={20} /> {/* Vital Task Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>My Task</span>
        </NavLink>
        
        <NavLink
          to="/task-categories"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }        
        >
          <BsListTask size={20} /> {/* Task Categories Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Task Categories</span>
        </NavLink>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }        
        >
          <FiSettings size={20} /> {/* Settings Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Settings</span>
        </NavLink>
        
        <NavLink
          to="/help"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
              : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
          }                >
          <AiOutlineQuestionCircle size={20} /> {/* Help Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Help</span>
        </NavLink>
      </nav>
    </div>
    <NavLink
          className={`text-white hover:bg-red-600 py-1 px-1 ${isMob.isMob ? 'mb-14': 'mb-28'} rounded-md flex items-center space-x-3 transition`}
          onClick={() => {
            logout();
            }}
        >
          <GoSignOut size={20} /> {/* Help Icon */}
          <span className={`${isMob.isMob ? 'hidden':''}`}>Logout</span>
        </NavLink>

    </div>
  );
};

export default Sidebar;

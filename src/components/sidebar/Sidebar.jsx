import React, { useEffect, useState,useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Person from '../../utils/images/Person.png';
import { AiOutlineQuestionCircle } from 'react-icons/ai'; // Icons for Dashboard and Help
import { BsExclamationLg } from 'react-icons/bs'; // Icon for Task Categories
import { GoSignOut } from 'react-icons/go'; // Icon for Task Categories
import { BiTask } from 'react-icons/bi'; // Icon for Settings
import { MdDashboard } from 'react-icons/md';
// import Swal from 'sweetalert2'
import { UserContext } from '../../UserContext';  // Import UserContext

const Sidebar = (isMob, setIsMob) => {
  const {updateUser } = useContext(UserContext);  // Access user data from context
  const [userEmail, setUserEmail] = useState('abc@gmail.com');
  const [username, setUsername] = useState('user');
  const [image, setImage] = useState(Person);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login if no token is found
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {

      // const user = JSON.parse( localStorage.getItem('user'));
      const token =localStorage.getItem('token');
      // if (user) {
      if (token) {
        try {
          setIsLoggedIn(true);
          // setUsername(`${user.first_name} ${user.last_name}` || 'User'); // Set the username from the token
          // setUserEmail(user.email || 'abc@gmail.com'); // Set the username from the token
          // setImage(user.image_url || Person); // Set the username from the token
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('user'); // Remove invalid token
          navigate('/login'); // Redirect to login if token is invalid
        }
      } else {
        // Swal.fire({
        //   title: "Signed Out",
        //   text:"You Have been Logged out! Sign in again.",
        //   heightAuto:true,
        //   allowOutsideClick:false,
        //   padding: "0",
        //   color: "white",
        //   background: "rgb(20 184 166)",
        //   confirmButtonText:'Login',
        //   confirmButtonColor:"teal",
        //   backdrop: `
        //   rgba(128,128,128, 0.35)
        //   `
        // }).then(()=>{
          navigate('/login'); // Redirect to login if no token is found
        // })
  
      }
  }, [navigate, isLoggedIn,updateUser]);

  useEffect (()=>{
    const intervalId = setInterval(() => {
      localStorage.removeItem('user')
      setIsLoggedIn(false);
    }, 1800000);
    return () => {
      clearInterval(intervalId);
    };

  },[])
  return (
    <div className={`flex flex-col bg-teal-500 h-full ${isMob.isMob ? 'w-15 mt-16' : 'w-64 mt-28'} p-4  fixed rounded-tr-lg rounded-br-lg`}>

      {/* User Info */}
      <div className={`${isMob.isMob ? 'hidden' : ''}`}>
        <div className="flex flex-col items-center">
          <Link to={'/account-details'} className="flex flex-col items-center">
          <img
            src={image}
            alt="User"
            className="rounded-full w-20 h-20 object-cove -mt-14  mb-2 shadow-xl"
            />
          <h2 className="text-white text-lg font-semibold">{username}</h2>
          <p className="text-gray-300 text-sm mb-5">{userEmail}</p>
            </Link>
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
            <span className={`${isMob.isMob ? 'hidden' : ''}`}>Dashboard</span>
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
            <span className={`${isMob.isMob ? 'hidden' : ''}`}>Vital Task</span>
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
            <span className={`${isMob.isMob ? 'hidden' : ''}`}>My Task</span>
          </NavLink>


          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
                : "text-white hover:bg-white hover:text-teal-700 py-1 px-1 rounded-lg flex items-center space-x-3 transition"
            }                >
            <AiOutlineQuestionCircle size={20} /> {/* Help Icon */}
            <span className={`${isMob.isMob ? 'hidden' : ''}`}>Help</span>
          </NavLink>
        </nav>
      </div>
      <NavLink
        className={`text-white hover:bg-red-600 py-1 px-1 ${isMob.isMob ? 'mb-14' : 'mb-28'} rounded-md flex items-center space-x-3 transition`}
        onClick={() => {
          logout();
        }}
      >
        <GoSignOut size={20} /> {/* Help Icon */}
        <span className={`${isMob.isMob ? 'hidden' : ''}`}>Logout</span>
      </NavLink>

    </div>
  );
};

export default Sidebar;

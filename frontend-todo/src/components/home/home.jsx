import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Function to extract username from the token stored in localStorage
  useEffect(() => {
    const t='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTJ0NDJsdzUwMDAwN2pwZHdwbzRkanFhIiwiZW1haWwiOiJhaG1hZHJhemExNjA0MjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3MzAyODgwODMsImV4cCI6MTczMDM3NDQ4M30.V5V562acYfot3ItZQ1CEVLYFzuzgrhjaCzGafx9I2iM'
    localStorage.setItem('token', t);
    const token = localStorage.getItem('token');
    
    if (token) {
        navigate('/dashboard')
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
<></>  );
};

export default Home;

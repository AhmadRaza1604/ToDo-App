import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Function to extract username from the token stored in localStorage
  useEffect(() => {
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

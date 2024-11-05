import './Signup.css'; // Import the global CSS styles
import React from 'react';
import { MdEmail } from 'react-icons/md'; // Importing eye icons
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupImage from '../../utils/images/Signup-image.png';

const RequestReset = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });

  // Set mode to 'onChange' for real-time validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',  // Validation occurs as the user types
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/request-otp/?email=${data.email}`);
        console.log('OTP Response:', response);
        if (response.status === 200) {
            toast.success('An OTP is sent to your Email!', {
                onClose: () => {
                    reset(); // Reset form fields
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('verifyPurpose', 'ResetPassword')
                    navigate('/verify'); // Redirect to login page
        
                },
            });
        }
    } catch (error) {
        console.error('OTP error:', error);
        const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
        toast.error(errorMessage);
    }  };

  return (
    <div id="signup-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="first-box" className="flex lg:flex-row flex-col-reverse">
        {/* Left side - Image */}
        <div id='image-container' className=" hidden lg:flex">
          <img src={SignupImage} alt="To-do App" id="todo-app-image" />
        </div>

        {/* Right side - Signup form */}
        <div id="signup-box" className="lg:ml-10">
          <h1 id="signup-title">Request Password Reset</h1>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
           
            <div className='relative'>
              <MdEmail className={`input-icon ${errors.email ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type="email"
                id="signup-email"
                placeholder="Enter Email"
                {...register('email')}
                className={`form-input pl-10 border ${errors.email
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>}
            </div>

            <button type="submit" id="signup-button">Verify Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestReset;

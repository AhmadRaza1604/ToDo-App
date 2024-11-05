import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock} from 'react-icons/fa'; // Importing eye icons
import { TbLock } from 'react-icons/tb'; // Importing eye icons
import {useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupImage from '../../utils/images/Signup-image.png';
import './Signup.css'; // Import the global CSS styles

const ResetPass = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password cannot exceed 50 characters')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[0-9]/, 'Password must contain a number')
      .matches(/[!@#$%^&*]/, 'Password must contain a special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Set mode to 'onChange' for real-time validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',  // Validation occurs as the user types
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
        const email= localStorage.getItem('email');
      // Make API call
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/forgot-password`, {
        email: email,
        password: data.password,
        confirm_password: data.password,
    });

      // Log response for debugging
      console.log('Reset Password response:', response);

      // Check if response is successful
      if (response.status === 200) {
        toast.success(response.data.message || 'Password Reset Successful!', {
          onClose: () => {
            reset(); // Reset form fields
            localStorage.removeItem('email')
            navigate('/login'); // Redirect to login page
          },
        });
      }
    } catch (error) {
      // Log error for debugging
      console.error('Reset Password error:', error);

      const errorMessage = error.response?.data?.message || 'Reset Password failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div id="signup-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="first-box" className="flex lg:flex-row flex-col-reverse">
        {/* Left side - Image */}
        <div id='image-container' className=" hidden lg:flex">
          <img src={SignupImage} alt="To-do App" id="todo-app-image" />
        </div>

        {/* Right side - Signup form */}
        <div id="signup-box" className="lg:ml-10">
          <h1 id="signup-title">Reset Password</h1>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className='relative'>
              <FaLock className={`input-icon ${errors.password ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="signup-password"
                placeholder="Enter New Password"
                {...register('password')}
                className={`form-input pl-10 border ${errors.password
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              <span id="password-toggle" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>}
            </div>
            <div className='relative'>
              <TbLock className={`input-icon ${errors.confirmPassword ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="signup-confirm-password"
                placeholder="Confirm New Password"
                {...register('confirmPassword')}
                className={`form-input pl-10 border ${errors.confirmPassword
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              <span id="confirm-password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-2">{errors.confirmPassword.message}</p>}
            </div>


            <button type="submit" id="signup-button">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;

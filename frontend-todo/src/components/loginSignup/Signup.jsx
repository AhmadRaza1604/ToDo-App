import './Signup.css'; // Import the global CSS styles
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(4, 'First Name must be at least 4 characters')
      .max(50, 'First Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z]*$/, 'First Name cannot contain special characters or Numbers')
      .required('First Name is required'),
    lname: Yup.string()
      .min(4, 'Last Name must be at least 4 characters')
      .max(50, 'Last Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z]*$/, 'Last Name cannot contain special characters or Numbers')
      .required('Last Name is required'),
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(50, 'Username cannot exceed 50 characters')
      .matches(/^[a-zA-Z0-9_]*$/, 'Username cannot contain special characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
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
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Accept Terms is required'),
  });

  // Set mode to 'onChange' for real-time validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',  // Validation occurs as the user types
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Make API call
      const response = await axios.post('http://localhost:5000/user/signup', {
        fname: data.fname,
        lname: data.lname,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // Log response for debugging
      console.log('Signup response:', response);

      // Check if response is successful
      if (response.status === 201) {
        toast.success(response.data.message || 'Signup successful!', {
          onClose: () => {
            reset(); // Reset form fields
            navigate('/login'); // Redirect to login page
          },
        });
      }
    } catch (error) {
      // Log error for debugging
      console.error('Signup error:', error);

      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div id="signup-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="first-box" className="flex lg:flex-row flex-col-reverse">
        {/* Left side - Image */}
        <div id='image-container' className=" hidden lg:flex">
          <img src="https://via.placeholder.com/300x300.png?text=Todo+App" alt="To-do App" id="todo-app-image" />
        </div>

        {/* Right side - Signup form */}
        <div id="signup-box" className="lg:ml-10">
          <ToastContainer /> {/* Toast container to display toasts */}
          <h1 id="signup-title">Sign Up</h1>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                id="signup-fname"
                placeholder="Enter First Name"
                {...register('fname')}
                className={`form-input ${errors.fname ? 'border-red-500' : ''}`}
              />
              {errors.fname && <p className="text-red-500 text-sm mt-1 ml-2">{errors.fname.message}</p>}
            </div>
            <div>
              <input
                type="text"
                id="signup-lname"
                placeholder="Enter Last Name"
                {...register('lname')}
                className={`form-input ${errors.lname ? 'border-red-500' : ''}`}
              />
              {errors.lname && <p className="text-red-500 text-sm mt-1 ml-2">{errors.lname.message}</p>}
            </div>
            <div>
              <input
                type="text"
                id="signup-username"
                placeholder="Enter Username"
                {...register('username')}
                className={`form-input ${errors.username ? 'border-red-500' : ''}`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1 ml-2">{errors.username.message}</p>}
            </div>
            <div>
              <input
                type="email"
                id="signup-email"
                placeholder="Enter Email"
                {...register('email')}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="signup-password"
                placeholder="Enter Password"
                {...register('password')}
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
              />
              <span id="password-toggle" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="signup-confirm-password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              <span id="confirm-password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-2">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms and Conditions checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="signup-terms"
                {...register('acceptTerms')}
                className={`form-checkbox ${errors.acceptTerms ? 'border-red-500' : ''}`}
              />
              <label htmlFor="signup-terms" className="ml-2">
                I agree with <Link to="/terms" className="text-teal-700 hover:text-blue-900">terms and conditions</Link>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-red-500 text-sm mt-1 ml-2">{errors.acceptTerms.message}</p>}

            <button type="submit" id="signup-button">Sign Up</button>
          </form>
          <div id="signup-login">
            <p>Already have an account? <Link to="/login" id="signup-login-link">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

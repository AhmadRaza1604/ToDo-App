import './Signup.css'; // Import the global CSS styles
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaUserEdit} from 'react-icons/fa'; // Importing eye icons
import { TbLock, TbUserEdit } from 'react-icons/tb'; // Importing eye icons
import { MdEmail } from 'react-icons/md'; // Importing eye icons
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupImage from '../../utils/images/Signup-image.png';
import TermsnCondition from '../TermsnCondition'; // Import the new component

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false); // State for terms modal

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(3, 'First Name must be at least 3 characters')
      .max(50, 'First Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z]*$/, 'First Name cannot contain special characters or Numbers')
      .required('First Name is required'),
    lname: Yup.string()
      .min(3, 'Last Name must be at least 3 characters')
      .max(50, 'Last Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z]*$/, 'Last Name cannot contain special characters or Numbers')
      .required('Last Name is required'),
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
        email: data.email,
        password: data.password,
        first_name: data.fname,
        last_name: data.lname,
        // username: data.username,
      });

      // Log response for debugging
      console.log('Signup response:', response);

      // Check if response is successful
      if (response.status === 200) {
        toast.success(response.data.message || 'Verify Email to Complete Signup!', {
          onClose: () => {
            reset(); // Reset form fields
            localStorage.setItem('email', data.email)
            localStorage.setItem('verifyPurpose', 'SignUp')
            navigate('/verify'); // Redirect to login page
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
          <img src={SignupImage} alt="To-do App" id="todo-app-image" />
        </div>

        {/* Right side - Signup form */}
        <div id="signup-box" className="lg:ml-10">
          <h1 id="signup-title">Sign Up</h1>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className='relative'>
              <TbUserEdit className={`input-icon ${errors.fname ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type="text"
                id="signup-fname"
                placeholder="Enter First Name"
                {...register('fname')}
                className={`form-input pl-10 border ${errors.fname
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              {errors.fname && <p className="text-red-500 text-sm mt-1 ml-2">{errors.fname.message}</p>}
            </div>
            <div className='relative'>
              <FaUserEdit className={`input-icon ${errors.lname ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type="text"
                id="signup-lname"
                placeholder="Enter Last Name"
                {...register('lname')}
                className={`form-input pl-10 border ${errors.lname
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              {errors.lname && <p className="text-red-500 text-sm mt-1 ml-2">{errors.lname.message}</p>}
            </div>
           
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
            <div className='relative'>
              <FaLock className={`input-icon ${errors.password ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="signup-password"
                placeholder="Enter Password"
                {...register('password')}
                className={`form-input pl-10 border ${errors.password
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                className={`form-input pl-10 border ${errors.confirmPassword
                  ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                  : 'focus:border-teal-700 focus:border-2'
                  }`}
/>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <span id="confirm-password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-2">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" id="signup-terms" {...register('acceptTerms')} className="form-checkbox" />
              <label htmlFor="signup-terms" className="ml-2">
                I agree with{' '}
                <button type="button" className="text-teal-700 hover:text-blue-900" onClick={() => setShowTerms(true)}>
                  terms and conditions
                </button>
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
      {showTerms && <TermsnCondition onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default Signup;
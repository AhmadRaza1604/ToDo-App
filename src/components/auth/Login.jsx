import './Login.css';
import React, { useState } from 'react';
import { MdMail } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'; // Removed Google icon
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImage from '../../utils/images/Login-page.png';
import { signInWithGooglePopup } from './SignInWithGoogle';
// Import the Google SVG logo
import GoogleLogo from '../../utils/images/google-icon.svg';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    // Form validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    // Configure react-hook-form with real-time validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange', // Enable validation onChange for real-time feedback
    });

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        handleGoogleLogin(response._tokenResponse);
    };

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, {
                email: data.email,
                password: data.password,
            });

            if (response.status === 200) {
                const user = response.data.user;
                const userName = `${user.first_name} ${user.last_name}`;
                localStorage.setItem('user', JSON.stringify(user)); // Store the user in local storage
                localStorage.setItem('token', user.access_token); // Store the user in local storage
                navigate('/dashboard'); // Navigate to home page on successful login
                toast.success(`Login successful! Welcome ${userName}`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleGoogleLogin = async (response) => {
        const access_token = response.oauthAccessToken;
        console.log(access_token);
        try {
            const apiResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/with-google/${access_token}`);

            if (apiResponse.status === 200) {
                const user = apiResponse.data.user;
                const userName = `${user.first_name} ${user.last_name}`;
                localStorage.setItem('user', JSON.stringify(user)); // Store the user in local storage
                localStorage.setItem('token', user.access_token); // Store the token in local storage
                navigate('/dashboard'); // Navigate to home page on successful login
                toast.success(`Login successful! Welcome ${userName}`);
            }
        } catch (error) {
            const errorMessage = error.apiResponse?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div id="login-container" className="min-h-screen flex flex-col justify-center items-center">
            <div id="first-box" className="flex lg:flex-row flex-col-reverse">
                <div id="login-box" className="lg:ml-10">
                    <h1 id="login-title">Sign In</h1>
                    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <MdMail className={`input-icon ${errors.email ? 'top-1/3' : 'top-1/2'} `} /> {/* Username Icon */}
                            <input
                                type="email"
                                id="login-username"
                                placeholder="Enter Email"
                                {...register('email')}
                                className={`form-input pl-10 border ${errors.email
                                    ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                                    : 'focus:border-teal-700 focus:border-2'
                                    }`}
                            />


                            {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>}
                        </div>
                        <div className="relative">
                            <FaLock className={`input-icon ${errors.password ? 'top-1/3' : 'top-1/2'} `} /> {/* Password Icon */}
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="login-password"
                                placeholder="Enter Password"
                                {...register('password')}
                                className={`form-input pl-10 border ${errors.password
                                    ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                                    : 'border-gray-400 focus:border-teal-700 focus:border-2'
                                    }`}
                            />
                            <span id="password-toggle" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>}
                        </div>

                        <div id="login-links">
                            <Link to="/reset-request" className="items-center" id="login-forgot-password">Forgot password?</Link>
                        </div>
                        <button type="submit" id="login-button" className='shadow-md'>Sign In</button>

                        <div id="login-signup">
                            <p>New user? <Link to="/signup" id="login-signup-link">Sign Up</Link></p>
                            <br /><h3 className='text-gray-500'>or</h3>
                        </div>

                        <div>
                            <button
                                id="g-login"
                                type="button"
                                className="text-gray-700 bg-white shadow-md w-full py-2 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                                onClick={logGoogleUser}
                            >
                                <img src={GoogleLogo} alt="Google logo" id='g-img' className="w-5 h-5 mr-3" />
                                Continue With Google
                            </button>
                        </div>
                    </form>
                </div>
                <div id='image-container' className="hidden lg:flex">
                    <img src={LoginImage} alt="To-do App" id="todo-app-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;

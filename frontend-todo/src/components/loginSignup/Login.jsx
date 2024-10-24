import './Login.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa'; // Importing icons
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    // Form validation schema using Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('UserName is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    // Configure react-hook-form with real-time validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange', // Enable validation onChange for real-time feedback
    });

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                username: data.username,
                password: data.password,
            });

            // Log the response for debugging
            console.log('Login response:', response);

            if (response.status === 200) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                const userName = decodedToken.username;
                localStorage.setItem('token', token); // Store the token in local storage
                toast.success(`Login successful! Welcome ${userName}`, {
                    onClose: () => {
                        navigate('/dashboard'); // Navigate to home page on successful login
                    },
                });
            }
        } catch (error) {
            console.error('Login error:', error);

            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div id="login-container" className="min-h-screen flex flex-col justify-center items-center">
            <div id="first-box" className="flex lg:flex-row flex-col-reverse">
                <div id="login-box" className="lg:ml-10">
                    <ToastContainer /> {/* Toast container to display toasts */}
                    <h1 id="login-title">Sign In</h1>
                    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <FaUser className="input-icon" /> {/* Username Icon */}
                            <input
                                type="text"
                                id="login-username"
                                placeholder="Enter Username"
                                {...register('username')}
                                className={`form-input pl-10 ${errors.username ? 'border-red-500' : ''}`} // Adjust padding for icon
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1 ml-2">{errors.username.message}</p>}
                        </div>
                        <div className="relative">
                            <FaLock className={`input-icon ${errors}`} /> {/* Password Icon */}
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="login-password"
                                placeholder="Enter Password"
                                {...register('password')}
                                className={`form-input pl-10 ${errors.password ? 'border-red-500' : ''}`} // Adjust padding for icon
                            />
                            <span id="password-toggle" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password.message}</p>}
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                id="signup-terms"
                                {...register('acceptTerms')}
                                className={`form-checkbox ${errors.acceptTerms ? 'border-red-500' : ''}`}
                            />
                            <label htmlFor="signup-terms" className="ml-2">
                                Remember me 
                            </label>
                        </div>

                        <div id="login-links">
                            <Link to="/forgot-password" className="items-center" id="login-forgot-password">Forgot password?</Link>
                        </div>
                        <button type="submit" id="login-button">Sign In</button>
                    </form>
                    <div id="login-signup">
                        <p>New user? <Link to="/signup" id="login-signup-link">Sign Up</Link></p>
                    </div>
                </div>
                <div id='image-container' className="hidden lg:flex">
                    <img src="https://via.placeholder.com/300x300.png?text=Todo+App" alt="To-do App" id="todo-app-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;

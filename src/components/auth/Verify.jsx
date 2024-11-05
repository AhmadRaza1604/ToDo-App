import './Verify.css';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImage from '../../utils/images/Login-page.png';

const Verify = () => {
    const navigate = useNavigate();
    
    // Form validation schema using Yup
    const validationSchema = Yup.object().shape({
        otp: Yup.string().matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
    });

    const { handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const inputRefs = useRef([]);
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));

    // Timer state management
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
    const [canResend, setCanResend] = useState(false);

    // Handle OTP input change
    const handleOtpChange = (e, index) => {
        const { value } = e.target;
        if (/^\d$/.test(value)) {  // Only allow single digit input
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            if (index < 5 && value) {
                inputRefs.current[index + 1].focus(); // Move to next input if not last
            }
        }
    };

    // Handle OTP deletion (backspace)
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus();  // Move to previous input if empty
        }
        if (e.key === 'Backspace' && otpValues[index] && index >= 0) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = null;
            setOtpValues(newOtpValues);
        }
    };

    // Resend OTP functionality
    const resend = async () => {
        const email = localStorage.getItem('email');
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/request-otp/?email=${email}`);
            console.log('Resend OTP Response:', response);
            if (response.status === 200) {
                toast.success('A new OTP is sent to your Email!', {
                    onClose: () => {},
                });
                // Reset timer and hide the resend button
                setTimeLeft(120);
                setCanResend(false);
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to send New OTP. Please try again.';
            toast.error(errorMessage);
        }
    };

    // Handle form submit
    const onSubmit = async () => {
        const otp = otpValues.join('');
        if (otp.length === 6) {
            try {
                const email = localStorage.getItem('email');
                const purpose = localStorage.getItem('verifyPurpose');
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/verify-otp`, { otp, email });
                console.log('Verify response:', response);
                if (response.status === 200) {
                    if (purpose === 'SignUp') {
                        toast.success('Verification successful! You Can Login Now!', {
                            onClose: () => {
                                localStorage.removeItem('verifyPurpose');
                                navigate('/login');
                            }
                        });
                    } else if (purpose === 'ResetPassword') {
                        toast.success('Verification successful! You Can Reset Password Now!', {
                            onClose: () => {
                                navigate('/reset-Pass');
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Verification error:', error);
                const errorMessage = error.response?.data?.message || 'Verification failed. Please try again.';
                toast.error(errorMessage);
            }
        } else {
            toast.error('Please enter a valid 6-digit OTP.');
        }
    };

    // Timer effect to count down from 2 minutes
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer); // Cleanup timer on unmount
        } else {
            setCanResend(true); // Show resend button when timer hits 0
        }
    }, [timeLeft]);

    // Format the time left into MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div id="verify-container" className="min-h-screen flex flex-col justify-center items-center">
            <div id="first-box" className="flex lg:flex-row flex-col-reverse">
                <div id="verify-box" className="lg:ml-10">
                    <ToastContainer />
                    <h1 id="verify-title">Verify OTP</h1>
                    <form id="verify-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="otp-inputs">
                            {otpValues.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className={`otp-input ${errors.otp ? 'border-red-500' : ''}`}
                                    value={value}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                        {errors.otp && <p className="text-red-500 text-center text-sm mt-1 ml-2">{errors.otp.message}</p>}
                        <button type="submit" id="verify-button">Verify</button>

                        <div id="verify-links">
                            {canResend ? (
                                <button type="button" onClick={resend} className="items-center" id="verify-resend">Resend OTP</button>
                            ) : (
                                <p className="text-center mt-3 text-gray-600">OTP Expires in {formatTime(timeLeft)}</p>
                            )}
                        </div>
                    </form>
                </div>
                <div id="image-container" className="hidden lg:flex">
                    <img src={LoginImage} alt="To-do App" id="todo-app-image" />
                </div>
            </div>
        </div>
    );
};

export default Verify;

import React, { useState, useEffect } from 'react';
import Person from '../../utils/images/Person.png';
import './Account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePass = () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [imageUrl, setImageUrl] = useState(Person)
    const navigate =useNavigate();
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
      old_password: Yup.string()
      .required('Old Password is required'),
        new_password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password cannot exceed 50 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[!@#$%^&*]/, 'Password must contain a special character')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });
  
    // Set mode to 'onChange' for real-time validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onChange',  // Validation occurs as the user types
    });
  

    const ChangePass = async(data)=>{

        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/change-password`,{
                old_password:data.old_password,
                new_password:data.new_password,
                confirm_password:data.confirm_password,
            },
            {
                headers: {
                  Authorization: `Bearer ${token}`,  // Send token in Authorization header
                },
              }
)
            if (response.status===200){
                toast.success(response.data.message || 'Password Reset Successful!', {
                    onClose: () => {
                        reset();
                        navigate('/account-details')
                    }
                })
            }
        } catch (error) {
            // Log error for debugging
            console.error('Change Password error:', error);
      
            const errorMessage = error.response?.data?.message || 'Change Password Failed. Please try again.';
            toast.error(errorMessage);
          }
          }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            try {
                setUsername(`${user.first_name} ${user.last_name}` || 'User');
                setUserEmail(user.email || 'User@gmail.com');
                setImageUrl(user.image_url || Person);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);


    return (
        <div className="account-container w-full border-gray rounded-lg shadow-md mt-4 border h-full">
           <div id='header-1'>
           <h1 id='account-header' className=" text-start  font-semibold font-sans text-teal-700 text-2xl border-b-2 mt-2 w-fit border-teal-700">Change Password</h1>
            <Link to={'/account-details'} id='back-link' className=' mr-4 border-teal-700 text-teal-700 underline-offset-1 mt-2 w-fit hover:'>Go Back</Link>
           
           </div>
            <div id='account-info' className=" flex justify-start mt-6 ml-6">
                <img
                    src={imageUrl}
                    alt="User"
                    className="rounded-full w-20 h-20 object-cover mb-2 shadow-xl"
                />
                <div>
                    <h3 id='account-userName' className=" text-start font-sans text-teal-700 text-xl font-semibold ml-2 mt-3 w-fit">{username}</h3>
                    <h3 id='account-email' className=" text-start font-sans text-teal-700 text-md ml-2 w-fit">{userEmail}</h3>
                </div>
            </div>
            <div className="account-form justify-self-center w-11/12 border-gray rounded-lg mb-6 shadow-sm mt-4 border h-full">
                <div className="form-inputs w-7/12 px-5 pt-2">
                    <label htmlFor="first-name" className="text-teal-700 font-semibold">Old Password</label>
                    <input
                        id="form-input"
                    {...register('old_password')}
                        className="shadow-sm mt-1 mb-2 rounded-full bg-gray-50 border-transparent focus:border-teal-700"
                                            />
              {errors.old_password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.old_password.message}</p>}

                                            
                    <label htmlFor="last-name" className="text-teal-700 mt-2 font-semibold">New Password</label>
                    <input
                        id="form-input"
                        {...register('new_password')}
                        className="shadow-sm mt-1 mb-2 rounded-full bg-gray-50 border-transparent focus:border-teal-700"
                        />
                        
                                  {errors.new_password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.new_password.message}</p>}
                    <label htmlFor="email" className="text-teal-700 mt-2 font-semibold">Confirm New Password</label>
                    <input
              
                        id="form-input"
                    {...register('confirm_password')}
                        className="shadow-sm mt-1 rounded-full bg-gray-50 border-transparent focus:border-teal-700"
                        />
              
              {errors.confirm_password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.confirm_password.message}</p>}

                </div>
                <div className="form-actions w-6/12 px-5 pb-2">
                    <button type="button" id='update-btn' className=" border-gray-300 mt-4 shadow-lg bg-gray-50 hover:text-white text-gray-500 px-4 py-1 rounded-full m-2 hover:bg-teal-500"
                    onClick={handleSubmit(ChangePass)}
                    >Change Password</button>
                    <button type="button" id='password-btn' className=" border-gray-300 mt-4 shadow-lg bg-gray-50 hover:text-white text-gray-500 px-4 py-1 rounded-full m-2 hover:bg-teal-500"><Link to={'/dashboard'}>Cancel</Link></button>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;

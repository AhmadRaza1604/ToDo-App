import React, { useEffect, useState, useContext } from 'react';
import Person from '../../utils/images/Person.png';
import './Account.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../UserContext';  // Import UserContext
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase imports
import {storage} from '../auth/SignInWithGoogle';  // Firebase config
import ClipLoader from "react-spinners/ClipLoader"; // Loader package
import {FaUpload} from 'react-icons/fa'

const Account = () => {
    const { updateUser } = useContext(UserContext);  
    const [userName, setUserName] = useState('user');
    const [email, setEmail] = useState('abc@gmail.com');
    const [imageUrl, setImageUrl] = useState(Person)
    const [loading, setLoading] = useState(false);  // Loader state
 
    const validationSchema = Yup.object().shape({
        fname: Yup.string()
            .min(3, 'First Name must be at least 3 characters')
            .max(50, 'First Name cannot exceed 50 characters')
            .matches(/^[a-zA-Z]*$/, 'First Name cannot contain special characters or numbers')
            .required('First Name is required'),
        lname: Yup.string()
            .min(3, 'Last Name must be at least 3 characters')
            .max(50, 'Last Name cannot exceed 50 characters')
            .matches(/^[a-zA-Z]*$/, 'Last Name cannot contain special characters or numbers')
            .required('Last Name is required'),
        phone: Yup.string()
        });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange', // Real-time validation
    });

    const UpdateAccount = async (data) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Image",imageUrl);
            console.log(process.env.REACT_APP_BASE_URL,"/user");
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/user`,
                {
                    first_name: data.fname,
                    last_name: data.lname,
                    phone_number: data.phone,
                    image_url: imageUrl, 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                }
            );

            if (response.status === 200) {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                updateUser(response.data.user.email);
                toast.success(response.data.message || 'Profile Update Successful!', {
                    onClose: () => {
                        reset();
                    },
                });
            }
        } catch (error) {
            console.error('Profile Update error:', error);
            const errorMessage = error.response?.data?.message || 'Profile Update Failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        const storageRef = ref(storage, `Pictures/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Optional: Can track progress here if needed
            },
            (error) => {
                toast.error("Image upload failed");
                console.error('Image upload error:', error);
                setLoading(false);  // Hide loader on success

            },
            () => {
                // Successful upload
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);  // Set uploaded image URL
                    setLoading(false);  // Hide loader on success
                    toast.success("Image uploaded successfully!");
                });
            }
        );
    };
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            try {
                setValue('fname', user.first_name || '');
                setValue('lname', user.last_name || '');
                setValue('email', user.email || 'User@gmail.com');
                setValue('phone', user.phone_number || '+92(300)123-4567');
                setEmail(user.email || 'abc@gmail.com');
                setUserName(`${user.first_name} ${user.last_name}` || 'User');
                setImageUrl(user.image_url || Person);  // Set user's image
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('user');
            }
        }
    }, [setValue, updateUser]);

    return (
        <div className="account-container w-full border-gray rounded-lg shadow-md mt-4 border h-full">
            <div id='header-1' className='mt-2'>
                <h1 id='account-header' className="text-start font-semibold font-sans text-teal-700 text-2xl border-b-2 mt-2 w-fit border-teal-700">Account Details</h1>
                <Link to={'/dashboard'} id='back-link' className='mr-4 border-teal-700 text-teal-700 underline-offset-1 mt-2 w-fit hover:text-teal-950'>Go Back</Link>
            </div>
            <div id='account-info' className="flex justify-start mt-6 ml-6">
                    <div className="relative">
                <img
                    src={imageUrl}
                    alt="User"
                    className="rounded-full w-20 h-20 object-cover shadow-xl -z-50"
                />
                    {loading && <ClipLoader color="#00BFFF" size={30} />}  {/* Show loader */}
                    <label htmlFor="file-upload" className="absolute cursor-pointer">
                        <FaUpload className="bg-gray-600 bg-opacity-0 text-transparent -mt-20 z-50 hover:text-gray-600 hover:bg-opacity-20 h-20 w-20 p-7 rounded-full" />
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden" // Hide the default file input
                        />
                    </label>
                </div>
                <div>
                    <h3 id='account-userName' className="text-start font-sans text-teal-700 text-xl font-semibold ml-2 mt-3 w-fit">
                        {userName}
                    </h3>
                    <h3 id='account-email' className="text-start font-sans text-teal-700 text-md ml-2 w-fit">
                        {email}
                    </h3>
                </div>
            </div>
            <div className="account-form justify-self-center w-11/12 border-gray rounded-lg mb-6 shadow-sm mt-4 border h-full">
                <div className="form-inputs w-7/12 px-5 pt-2">
                    <label htmlFor="first-name" className="text-teal-700 font-semibold">First Name</label>
                    <input
                        id="form-input"
                        {...register('fname')}
                        className={`shadow-sm mt-1 mb-2 rounded-full bg-gray-50 border-transparent ${errors.fname
                                            ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                                            : 'focus:!border-teal-700 focus:!border-2'
                                            }`}
                    />
                    {errors.fname && <p className="text-red-500 text-sm ml-2">{errors.fname.message}</p>}

                    <label htmlFor="last-name" className="text-teal-700 mt-2 font-semibold">Last Name</label>
                    <input
                        id="form-input"
                        {...register('lname')}
                        className={`shadow-sm mt-1 mb-2 rounded-full bg-gray-50 border-transparent ${errors.lname
                            ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                            : 'focus:!border-teal-700 focus:!border-2'
                            }`}
                    />
                    {errors.lname && <p className="text-red-500 text-sm ml-2">{errors.lname.message}</p>}

                    <label htmlFor="email" className="text-teal-700 mt-2 font-semibold">Email</label>
                    <input
                        id="form-input"
                        {...register('email')}
                        className="shadow-sm mt-1 mb-2 rounded-full bg-gray-200 border-transparent focus:border-teal-700"
                        disabled
                    />

                    <label htmlFor="phone" className="text-teal-700 mt-2 font-semibold">Phone</label>
                    <input
                        id="form-input"
                        {...register('phone')}
                        className={`shadow-sm mt-1 rounded-full bg-gray-50 border-transparent ${errors.phone
                                            ? '!border-red-500 focus:!border-red-500 focus:!border-2'
                                            : 'focus:!border-teal-700 focus:!border-2'
                                            }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone.message}</p>}

                </div>
                <div className="form-actions w-6/12 px-5 pb-2">
                    <button type="button" id='update-btn' className="border-gray-300 mt-4 shadow-lg hover:bg-gray-50 text-white hover:text-gray-500 px-4 py-1 rounded-full m-2 bg-teal-500"
                        onClick={handleSubmit(UpdateAccount)}
                    >Update Info</button>
                    <button type="button" id='password-btn' className="border-gray-300 mt-4 shadow-lg hover:bg-gray-50 text-white hover:text-gray-500 px-4 py-1 rounded-full m-2 bg-teal-500">
                        <Link to={'/change-password'}>Change Password</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { RiImageAddLine } from 'react-icons/ri';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {storage} from '../auth/SignInWithGoogle';  // Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase imports
import ClipLoader from "react-spinners/ClipLoader"; // Loader package


const EditTask = ({ onClose }) => {
    const [date, setDate] = useState(Date.now);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState()
    const [loading, setLoading] = useState(false);  // Loader state

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedImage(URL.createObjectURL(file));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': [],
        }, // Accept specific MIME types
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        const storageRef = ref(storage, `Task-Pics/${file.name}`);
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

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Title must be at least 3 characters')
            .max(50, 'Title cannot exceed 50 characters')
            .matches(/^[a-zA-Z]*$/, 'Title cannot contain special characters')
            .required('Title is required'),
        date: Yup.string()
            .required('Date is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange', // Real-time validation
    });


    const addTask = async(data)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/add-task`,
                {
                    title: data.title,
                    date: data.date,
                    priority: data.priority,
                    image_url: imageUrl,
                    description: data.description, 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message || 'Task Added Successfully!', {
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
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-50 rounded-lg p-4 max-w-screen-md w-full mx-6">
                <div id='header-1'>
                    <h2 className="text-lg border-b-2 w-fit border-teal-500 text-start text-teal-700 font-bold mb-4">Edit Task</h2>
                    <button onClick={onClose} id='back-link' className='mr-4 border-teal-700 text-teal-700 underline-offset-1 w-fit hover:text-teal-950'>Go Back</button>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar rounded-md border border-gray-300">
                    <div className="form-inputs-1 px-5 pt-2">
                        <label htmlFor="title" className="text-teal-700 font-semibold">Title</label>
                        <input
                            id="form-input"
                            {...register('title')}
                            className={`mt-1 mb-2 rounded-full bg-gray-100 border-transparent ${errors.title
                                ? '!border-red-500 focus:!border-red-500 bg-gray-100'
                                : 'focus:!border-teal-700 bg-gray-100'
                                } `}
                        />
                        {errors.title && <p className="text-red-500 text-sm ml-2">{errors.title.message}</p>}

                        <label htmlFor="date" className="text-teal-700 mt-2 font-semibold">Date</label>
                        <input
                            id="form-input"
                            type='date'
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                            {...register('date')}
                            className={`mt-1 mb-2 rounded-full bg-gray-100 border-transparent ${errors.date
                                ? '!border-red-500 focus:!border-red-500 bg-gray-100'
                                : 'focus:!border-teal-700 bg-gray-100'
                                }`}
                        />
                        {errors.date && <p className="text-red-500 text-sm ml-2">{errors.date.message}</p>}

                        <label htmlFor="priority" className="text-teal-700 font-semibold">Priority</label>
                        <div className='flex justify-between'>
                            <div className='flex justify-around'>
                                <input
                                    type="radio"
                                    id="low"
                                    {...register('priority')}
                                    value="low"
                                    className={`appearance-none h-4 w-4 mt-1 border-gray-300 border-2 rounded-full focus:outline-none checked:bg-green-500 `}
                                />
                                <label htmlFor="low" className="text-green-600 ml-1">Low</label>
                            </div>
                            <div className='flex justify-around'>
                                <input
                                    type="radio"
                                    id="moderate"
                                    {...register('priority')}
                                    value="moderate"
                                    className={`appearance-none h-4 w-4 mt-1 border-2 border-gray-300 rounded-full checked:bg-blue-500 focus:outline-none `}
                                />
                                <label htmlFor="moderate" className="text-blue-500 ml-1">Moderate</label>
                            </div>
                            <div className='flex justify-around'>
                                <input
                                    type="radio"
                                    id="extreme"
                                    {...register('priority')}
                                    value="extreme"
                                    className={`appearance-none h-4 w-4 border-2 mt-1 border-gray-300 rounded-full checked:bg-red-500 focus:outline-none`}
                                />
                                <label htmlFor="extreme" className="text-red-600 ml-1">Extreme</label>
                            </div>

                        </div>


                    </div>
                    <div id='row-add' className='px-5 pt-2'>
                        <div className='form-inputs-1'>
                            <label htmlFor="description" className="text-teal-700 font-semibold">Description</label>
                            <textarea
                                id="form-input"
                                type='text'
                                placeholder='Start writing here...'
                                rows='5'
                                {...register('description')}
                                className={`mt-1 mb-2 rounded-full bg-gray-100 border-transparent ${errors.description
                                    ? '!border-red-500 focus:!border-red-500 bg-gray-100'
                                    : 'focus:!border-teal-700 bg-gray-100'
                                    }`}
                            />
                            {errors.description && <p className="text-red-500 text-sm ml-2">{errors.description.message}</p>}
                        </div>
                        <div className='form-inputs-2 pl-5'>
                            <label htmlFor="upload-image" className="text-teal-700 font-semibold">Upload Image</label>
                    {loading && <ClipLoader color="#00BFFF" size={30} />}  {/* Show loader */}
                            
                            <div
                                {...getRootProps()}
                                className="border rounded-lg border-gray-300 p-2 mt-1 text-center text-gray-500 bg-gray-100 cursor-pointer"
                            >
                                <input {...getInputProps()}
                                onChange={handleImageUpload}
                                />
                                {uploadedImage ? (
                                    <img src={uploadedImage} alt="Uploaded" className="h-32 w-32 object-cover mx-auto" />
                                ) : (
                                    <div className='justify-items-center shadow-none'>
                                        <span className='text-2xl'><RiImageAddLine /></span>
                                        <p>Drag & Drop files here  </p>
                                        <p>or</p>
                                        <p className="border rounded-md border-gray-300 px-2 mb-1 mt-1">Browse</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                </div>
                <div className='flex justify-start '>
                    <button
                        onClick={handleSubmit(addTask)}
                        className="mt-4 bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
                    >
                        Done
                    </button>

                </div>
            </div>
        </div>
    );
};

export default EditTask;



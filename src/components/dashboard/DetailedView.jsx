import React from 'react';
import Person from '../../utils/images/Person.png';
import { MdDeleteForever, MdTaskAlt} from 'react-icons/md';
import { LuClipboardEdit} from 'react-icons/lu';
import { BsExclamation} from 'react-icons/bs';

const DetailedView = ({ data, onClose }) => {
    const currentTime = new Date(); // State for terms modal

    return (
        <div id='dash-res2' className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
<div id='dash-res1' className=' bg-gray-50 rounded-lg p-4 max-w-screen-md w-6/12 mx-6'>

            <div id='header-1'>
                <h2 className="text-lg border-b-2 w-fit border-teal-500 text-start text-teal-700 font-bold mb-4">Task Desription</h2>
                <button onClick={onClose} id='back-link' className='mr-4 border-teal-700 text-teal-700 underline-offset-1 w-fit hover:text-teal-950'>Go Back</button>
            </div>

            <div className='flex justify-start '>
                <img
                    className='w-36 h-36 rounded-md m-4'
                    alt='Task-Image'
                    src={Person}
                />
                <div className='my-10'>
                    <h1 className='font-semibold'>{data.title}</h1>
                    {data.status !== 'Completed' && (
                        <p>Priority: <span className={`${data.priority === 'Low' ? 'text-green-600' : data.priority === 'Moderate' ? 'text-blue-600' : 'text-red-600'}`}>{data.priority}</span> </p>
                    )}
                    <p>Status: <span className={`${data.status === 'Completed' ? 'text-green-600' : data.status === 'In Progress' ? 'text-blue-600' : 'text-red-600'}`}>{data.status}</span> </p>
                    <p className='text-gray-500'>Created On: {currentTime.getDate()}/{currentTime.getUTCMonth() + 1}/{currentTime.getFullYear()}</p>
                </div>
            </div>
            <p className='text-gray-500 text-center' >{data.description}</p>
            <div className='flex justify-end m-2 mt-6 text-2xl font-bold space-x-4 text-teal-500 '>
                <button className='hover:text-teal-700' title='Finish Task'><MdTaskAlt/></button>
                <button className='hover:text-teal-700' title='Edit Task'><LuClipboardEdit/></button>
                <button className='hover:text-teal-700' title='Delete Task'><MdDeleteForever/></button>
                <button className='hover:text-teal-700 font-extrabold text-3xl' title='Set as Vital'><BsExclamation/></button>
            </div>
            </div>
        </div>

    );
};

export default DetailedView;
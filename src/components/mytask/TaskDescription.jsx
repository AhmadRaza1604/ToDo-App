import React,{useState} from 'react';
import Person from '../../utils/images/Person.png';
import { MdDeleteForever, MdTaskAlt} from 'react-icons/md';
import { LuClipboardEdit} from 'react-icons/lu';
import { BsExclamation} from 'react-icons/bs';
import EditTask from '../task/EditTask';

const TaskDescription = ({data}) => {
    const [currentTime, setCurrentTime] = useState(new Date()); // State for terms modal
    const [showEditTask, setShowEditTask] = useState(false); // State for terms modal

    return (
        <div>
        <div id='dash-res3'>
            <div id='dash-res2'>
            <img
            className='w-36 h-36 rounded-md m-4'
            src={Person}
            />
            </div>
        <div className='mt-10'>
        <h1 className='font-semibold'>{data.title}</h1>
                {data.status !== 'Completed' && (
                  <p>Priority: <span className={`${data.priority === 'Low' ? 'text-green-600' : data.priority === 'Moderate' ? 'text-blue-600' : 'text-red-600'}`}>{data.priority}</span> </p>
                )}
                <p>Status: <span className={`${data.status === 'Completed' ? 'text-green-600' : data.status === 'In Progress' ? 'text-blue-600' : 'text-red-600'}`}>{data.status}</span> </p>
                <p className='text-gray-500'>Created On: {currentTime.getDate()}/{currentTime.getUTCMonth() + 1}/{currentTime.getFullYear()}</p>
        </div>
        </div>
                <p className='text-gray-500 m-10 text-center' >{data.description}</p>
                <div className='flex justify-end m-2 mt-6 text-2xl font-bold space-x-4 text-teal-500 '>
                {data.status!=='Completed' && 
                <>
                <button className='hover:text-teal-700' title='Finish Task'><MdTaskAlt/></button>
                <button 
                onClick={() => setShowEditTask(true)}
                className='hover:text-teal-700' title='Edit Task'><LuClipboardEdit/></button>
                <button className='hover:text-teal-700 font-extrabold text-3xl' title='Set as Vital'><BsExclamation/></button>
                </>
                }
                <button className='hover:text-teal-700' title='Delete Task'><MdDeleteForever/></button>
            </div>
            {showEditTask && <EditTask onClose={() => setShowEditTask(false)} />}
        </div>
  
    );
};

export default TaskDescription;
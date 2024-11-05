import React,{useEffect, useState} from 'react';
import { FaDotCircle} from 'react-icons/fa';
import Person from '../../utils/images/Person.png';

const Card = ({taskData,index,hoverEffect,isSelected}) => {
    const [currentTime, setCurrentTime] = useState(new Date()); // State for terms modal
    const cardClasses = ` ${
        hoverEffect ? 'cursor-pointer' : ''
      } ${
        isSelected
          ? 'bg-gray-100' // Background for the selected card
          : hoverEffect
          ? 'hover:bg-gray-50' // Hover effect background
          : ''
      }`;


      useEffect(()=>{

      },[isSelected])
    return (
        <div>

          <div key={index} className={`${cardClasses} border m-2 p-2 border-gray shadow-sm justify-self-center rounded-xl w-10/12`}>
            <FaDotCircle className={` ${taskData.status === 'Not Started' ? 'text-red-600' :taskData.status==='In Progress' ? 'text-blue-600': 'text-green-600'}`} />
            <div id='card-res' className='mx-5 -mt-2 flex justify-between'>
              <div className=''>
                <h1 className='font-semibold'>{taskData.title}</h1>
                {taskData.status !== 'Completed' && (
                  <p>Priority: <span className={`${taskData.priority === 'Low' ? 'text-green-600' : taskData.priority === 'Moderate' ? 'text-blue-600' : 'text-red-600'}`}>{taskData.priority}</span> </p>
                )}
                <p>Status: <span className={`${taskData.status === 'Completed' ? 'text-green-600' : taskData.status === 'In Progress' ? 'text-blue-600' : 'text-red-600'}`}>{taskData.status}</span> </p>
                <p className='text-gray-500'>Created On: {currentTime.getDate()}/{currentTime.getUTCMonth() + 1}/{currentTime.getFullYear()}</p>
              </div>
              <div>
                <img
                  src={Person}
                  alt="Task"
                  className='w-24 h-24 rounded-lg'
                />
              </div>
            </div>
          </div>
        </div>
    );
};

export default Card;
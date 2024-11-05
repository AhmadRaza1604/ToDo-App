import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTask from '../task/AddTask';
import Person from '../../utils/images/Person.png';
import ProgressCharts from './ProgressCharts';
import Card from './Card';
import { BiNotepad, BiTask } from 'react-icons/bi';
import { PiNotepad } from 'react-icons/pi';
import DetailedView from './DetailedView';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [showAddTask, setShowAddTask] = useState(false); // State for terms modal
  const [showTaskDescription, setShowTaskDescription] = useState(false); // State for terms modal
  const [dataDesc, setDataDesc] = useState(); // State for terms modal
  const taskData = [{
    title: 'My First Task',
    priority: 'Low',
    image_url: { Person },
    status: 'Not Started',
    description: 'This is Test Description from My First Task it will be detailed when real description.'
  }, {
    title: 'Second Task',
    priority: 'Moderate',
    image_url: { Person },
    status: 'Not Started',
    description: 'This is Test Description from Second Task it will be detailed when real description.'
  }
  ]
  const taskData1 = [{
    title: 'My First Task',
    priority: 'Extreme',
    image_url: { Person },
    status: 'Completed',
    description: 'This is Test Description from Second Task it will be detailed when real description.'
  }, {
    title: 'Second Task',
    priority: 'Moderate',
    image_url: { Person },
    status: 'Completed',
    description: 'This is Test Description from Second Task it will be detailed when real description.'
  }
  ]
  const taskData2 = [{
    title: 'My First Task',
    priority: 'Extreme',
    image_url: { Person },
    status: 'In Progress',
    description: 'This is Test Description from Second Task it will be detailed when real description.'
  }, {
    title: 'Second Task',
    priority: 'Low',
    image_url: { Person },
    status: 'Not Started',
    description: 'This is Test Description from Second Task it will be detailed when real description.'
  }
  ]

  // const handleDescription =({data1})=>{
  //   console.log(data1);
  //   setData(data1);
  //   console.log(data);
  //   setShowTaskDescription(true);
  // }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      try {
        setUsername(`${user.first_name} ${user.last_name}` || 'User'); // Set the username from the token
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('user'); // Remove invalid token
        navigate('/login'); // Redirect to login if token is invalid
      }
    }
  }, [navigate]);

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure day is 2 digits
  const month = currentDate.toLocaleString('en-US', { month: 'short' }); // "Nov" for November

  const formattedDate = `${day} ${month}`;
  return (
    <div>

      <h1 className='text-center font-semibold font-sans text-teal-700 text-3xl'>Welcome Back, {username}</h1>
      <div id='dash-res' className=" w-full border-gray rounded-sm mt-4 border h-full flex justify-between">
        <div  id='dash-res1' className='w-3/6 border-gray-100 rounded-xl shadow-lg justify-self-center border h-full my-4'>
          <div className='flex justify-between m-2 '>
            <p className='text-teal-600 font-semibold flex items-center px-1 space-x-1'><PiNotepad /><span>To-Do</span></p>
            <button
              onClick={() => setShowAddTask(true)}
              className='border-gray-300 hover:shadow-md text-gray-400 px-4 py-1 rounded-full hover:bg-gray-50'><span className='text-lg text-teal-800 font-bold'>+</span> Add Task</button>
          </div>
          <p className='m-3 text-gray-900'>{formattedDate}
            <span className={`inline-block mx-2 mb-1 w-1 h-1 bg-gray-500 rounded-full mr-1`}></span>
            <span className={`text-gray-500`}>Today</span>
          </p>
          {taskData.map((data, index) => (
            <div onClick={() => [
              setDataDesc(data),
              setShowTaskDescription(true)
            ]}>
              <Card taskData={data} index={index} hoverEffect={true} />
            </div>
          ))}
          <div className=' inline-block border-gray-200 border-b w-full h-fit'></div>
          <p className='m-3 text-gray-900'>{formattedDate}
            <span className={`inline-block mx-2 mb-1 w-1 h-1 bg-gray-500 rounded-full mr-1`}></span>
            <span className={`text-gray-500`}>Yesterday</span>
          </p>
          {taskData2.map((data, index) => (
            <div onClick={() => [
              setDataDesc(data),
              setShowTaskDescription(true)
            ]}>

              <Card taskData={data} hoverEffect={true} index={index} />
            </div>
          ))}
        </div>
        <div id='dash-res1' className='w-3/6 my-4 justify-self-center'>
          <div className='w-full border-gray-100 rounded-xl shadow-lg border h-fit'>
            <div className='m-2'>
              <p className='text-teal-600 font-semibold flex items-center px-1 space-x-1'><BiNotepad /><span>Task Status</span></p>
              <ProgressCharts />
            </div>
          </div>
          <div className='w-full mt-6 border-gray-100 rounded-xl shadow-lg border h-fit'>
            <div className='m-2'>
              <p className='text-teal-600 font-semibold flex items-center px-1 space-x-1'><BiTask /><span>Completed Tasks</span></p>
              {taskData1.map((data, index) => (
                <div onClick={() => [
                  setDataDesc(data),
                  setShowTaskDescription(true)
              ]}>

                  <Card taskData={data} hoverEffect={true} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showTaskDescription && <DetailedView data={dataDesc} onClose={() => setShowTaskDescription(false)} />}
      {showAddTask && <AddTask onClose={() => setShowAddTask(false)} />}
    </div>
  );
};

export default Dashboard;

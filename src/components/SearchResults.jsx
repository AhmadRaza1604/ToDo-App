import React,{useState} from 'react';
import Person from '../utils/images/Person.png';
import Card from './dashboard/Card';
import TaskDescription from './mytask/TaskDescription';

const SearchResults = () => {
    const taskData = [{
        id:1,
        title: 'My First Task',
        priority: 'Low',
        description:'Hello There this is a test decription I am trying to make a todo app.',
        image_url: { Person },
        status: 'In Progress'
    },{
        id:2,
        title: 'Second Task',
        priority: 'Moderate',
        description:'Hello There this is a test decription I am trying to make a todo app. This is another task. Its all fake data.',
        image_url: { Person },
        status: 'Not Started'
      }
    ,{
        id:3,
        title: 'Third Task',
        priority: 'Extreme',
        description:'Hello There this is a test decription I am trying to make a todo app. This is another task. Its all fake data.',
        image_url: { Person },
        status: 'In Progress'
      }
      ]

      const [selectedTask, setSelectedTask] = useState(taskData[0].id);      
      const handleCardClick = (task) => {
        setSelectedTask(task.id);
      };


    return (
        <div id='dash-res' className=" w-full border-gray-50 rounded-sm mt-4 border h-full flex justify-between">
        <div  id='dash-res1' className='w-3/6 border-gray-100 rounded-xl shadow-lg m-4 justify-self-center border h-full'>
        <div id='header-1' className='mt-2'>
                <h1 id='account-header' className="text-start font-semibold font-sans text-teal-700 text-lg border-b-2 mt-2 w-fit border-teal-700">Search Results</h1>
            </div>
          {taskData.map((data, index) => (
            <div onClick={()=>handleCardClick(data)}>
            <Card taskData={data} index={index} hoverEffect={true} isSelected={selectedTask === data.id}            />
            </div>
          ))}
            </div>
            <div id='dash-res1' className='w-3/6 m-4 justify-self-center border-gray-100 rounded-xl shadow-lg border h-fit'>

            <TaskDescription data={taskData.find(task => task.id === selectedTask)}/>
        </div>
        </div>
    );
};

export default SearchResults;
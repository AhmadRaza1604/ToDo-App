import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai'; // Icons for Dashboard and Help

const Help = () => {
    return (
      <div className="w-full border-gray-200 rounded-lg mt-4 border h-full p-4">
        <div id='header-1' className='mt-2'>
          <h1 id='account-header' className=" flex justify-between text-start font-semibold font-sans text-teal-700 text-2xl mt-2 w-fit">
            <span className='border-b-2  border-teal-700'>Help</span>
          <AiOutlineQuestionCircle className='mt-1  ' size={30} />
            </h1>
        </div>
        <div className='mx-6 text-justify'>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">How to Add a Task</h2>
          <p className="mt-2 text-gray-600">
            To add a task, click on the "Add Task" button located at the top of the screen. Fill out the required fields such as task name, description, due date, priority, and status. Once all details are entered, click "Save" to create your task.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">How to Edit a Task</h2>
          <p className="mt-2 text-gray-600">
            To edit a task, go to the task list, find the task you want to modify, and click the "Edit" icon next to it. You can then update the task details such as name, description, status, or priority. After making changes, click "Update" to save the changes.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">How to Delete a Task</h2>
          <p className="mt-2 text-gray-600">
            To delete a task, locate the task you want to remove in the task list. Click the "Delete" icon (usually represented by a trash can). A confirmation prompt will appear; click "Confirm" to permanently delete the task.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">Task Statuses</h2>
          <p className="mt-2 text-gray-600">
            - <span className="font-medium">Not Started:</span> The task has been created but no work has begun.
            <br />
            - <span className="font-medium">In Progress:</span> The task is currently being worked on.
            <br />
            - <span className="font-medium">Completed:</span> The task has been finished.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">Task Priority</h2>
          <p className="mt-2 text-gray-600">
            You can assign a priority to your tasks to indicate their importance:
            <br />
            - <span className="font-medium">Low:</span> This task is not urgent and can be addressed later.
            <br />
            - <span className="font-medium">Moderate:</span> This task is of medium importance and should be done soon.
            <br />
            - <span className="font-medium">Extreme:</span> This task is critical and needs immediate attention.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">User Profile</h2>
          <p className="mt-2 text-gray-600">
            In your user profile, you can view your personal information, update your name, email, and profile picture. You can also manage your settings and preferences from the profile section.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">Change Password</h2>
          <p className="mt-2 text-gray-600">
            To change your password, go to your profile, select the "Change Password" option, enter your current password, and then your new password. Confirm the new password and click "Save" to update it.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg text-teal-600">Vital Tasks vs My Tasks</h2>
          <p className="mt-2 text-gray-600">
            - <span className="font-medium">Vital Tasks:</span> These are the most critical tasks marked as high priority or with tight deadlines. They appear at the top of your task list.
            <br />
            - <span className="font-medium">My Tasks:</span> This is your complete list of tasks, showing all tasks assigned to you with options to filter and manage them by priority, status, or deadline.
          </p>
        </div>
        </div>
      </div>
    );
};

export default Help;

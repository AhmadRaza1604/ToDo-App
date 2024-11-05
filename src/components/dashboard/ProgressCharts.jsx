import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCharts = () => {
  const progressData = [
    { value: 73, label: "Completed", color: "green" },
    { value: 12, label: "In Progress", color: "blue" },
    { value: 15, label: "Not Started", color: "red" }
  ];

  return (
    <div className="flex justify-around space-x-4 mt-6">
      {progressData.map((data, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={data.value}
              text={`${data.value}%`}
              styles={buildStyles({
                textColor: "#000",
                pathColor: data.color,
                trailColor: "#d6d6d6"
              })}
            />
          </div>
          <p className="mt-2 text-center text-sm">
            <span className={`inline-block w-2 h-2 rounded-full ${data.color==='green'? 'bg-green-500': data.color==='blue'? 'bg-blue-500':'bg-red-500'} mr-1`}></span>
            {data.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressCharts;

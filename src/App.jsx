// src/App.js
import React, { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import WorkoutChart from './components/WorkoutChart';
import toast from 'react-hot-toast';
import './App.css';

function App() {
  const [open, setOpen] = useState("workout");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(savedWorkouts);
  }, []);

  const addUserWorkout = (username, workoutType, workoutMinutes) => {
    const newWorkout = {
      id: workouts.length ? workouts[workouts.length - 1].id + 1 : 1,
      username,
      workoutType,
      workoutMinutes,
    };

    const updatedWorkouts = [newWorkout, ...workouts];
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    toast.success("Workout added");
  };

  const handleClick = (val) => {
    setOpen(val);
  };

  return (
    <>
      <div>
        <div className='flex p-2 gap-6 justify-center'>
          <button type='button' onClick={() => handleClick("workout")} className='bg-gray-300 p-2'>
            Workout
          </button>
          <button type='button' onClick={() => handleClick("workout list")} className='bg-gray-300 p-2'>
            Workout Details
          </button>
          <button type='button' onClick={() => handleClick("workout chart")} className='bg-gray-300 p-2'>
            Workout Chart
          </button>
        </div>
        {open === "workout" && <WorkoutForm addUserWorkout={addUserWorkout} />}
        {open === "workout list" && <WorkoutList workouts={workouts} />}
        {open === "workout chart" && <WorkoutChart workouts={workouts} />}
      </div>
    </>
  );
}

export default App;

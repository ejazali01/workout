// src/components/WorkoutForm.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const WorkoutForm = ({ addUserWorkout }) => {
  const [username, setUsername] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutMinutes, setWorkoutMinutes] = useState('');

  const handleAddWorkout = () => {
    if (username && workoutType && workoutMinutes) {
      addUserWorkout(username, workoutType, workoutMinutes);
      // Clear the form
      setUsername('');
      setWorkoutType('');
      setWorkoutMinutes('');
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Workout</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Workout Type</label>
        <select
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">--Select Workout Type--</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Workout Minutes</label>
        <input
          type="number"
          value={workoutMinutes}
          onChange={(e) => setWorkoutMinutes(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddWorkout}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Workout
      </button>
    </div>
  );
};

export default WorkoutForm;

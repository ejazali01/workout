// src/components/WorkoutChart.js
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';

const WorkoutChart = ({ workouts }) => {
  // Aggregate data for the charts
  const aggregateData = (data) => {
    const workoutTypes = {};
    const userWorkouts = {};

    data.forEach(workout => {
      const { username, workoutType, workoutMinutes } = workout;

      // Aggregate workout types
      if (workoutTypes[workoutType]) {
        workoutTypes[workoutType] += parseInt(workoutMinutes, 10);
      } else {
        workoutTypes[workoutType] = parseInt(workoutMinutes, 10);
      }

      // Aggregate user workouts
      if (username) {
        if (userWorkouts[username]) {
          userWorkouts[username] += parseInt(workoutMinutes, 10);
        } else {
          userWorkouts[username] = parseInt(workoutMinutes, 10);
        }
      }
    });

    // Convert objects to arrays
    const workoutTypeData = Object.keys(workoutTypes).map(type => ({
      name: type,
      minutes: workoutTypes[type]
    }));

    const userWorkoutData = Object.keys(userWorkouts).map(name => ({
      name,
      minutes: userWorkouts[name]
    }));

    return { workoutTypeData, userWorkoutData };
  };

  const { workoutTypeData, userWorkoutData } = aggregateData(workouts);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'];

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Workout Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Total Minutes by Workout Type</h3>
          <BarChart
            width={500}
            height={300}
            data={workoutTypeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Total Minutes by User</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={userWorkoutData}
              dataKey="minutes"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {userWorkoutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default WorkoutChart;

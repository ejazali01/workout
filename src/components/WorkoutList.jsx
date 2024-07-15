// src/components/WorkoutList.js
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const WorkoutList = ({ workouts }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const workoutsPerPage = 5; // Adjust this number to change the number of workouts per page

  // Get unique usernames
  const uniqueUsernames = Array.from(new Set(workouts.map((workout) => workout.username)));

  // Paginate unique usernames
  const offset = currentPage * workoutsPerPage;
  const paginatedUsernames = uniqueUsernames.slice(offset, offset + workoutsPerPage);
  const pageCount = Math.ceil(uniqueUsernames.length / workoutsPerPage);

  // Filter workouts for the selected user
  const filteredWorkouts = selectedUser
    ? workouts.filter((workout) => workout.username === selectedUser)
    : [];

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setSelectedUser(null); // Reset selected user when changing pages
  };

  const handleUserClick = (username) => {
    setSelectedUser(username === selectedUser ? null : username);
  };

  const handleBackButtonClick = () => {
    setSelectedUser(null); // Reset selected user on back button click
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Workout List</h2>
      {selectedUser ? (
        <>
          <button
            onClick={handleBackButtonClick}
            className="bg-gray-200 text-black p-4 text-md font-semibold rounded-full hover:bg-gray-300 mb-4"
          >
            {`<`}
          </button>
          <ul>
            {filteredWorkouts.map((workout) => (
              <li key={workout.id} className="mb-2">
                <div className="p-2 border rounded">
                  <p>
                    <strong>Username:</strong> {workout.username}
                  </p>
                  <p>
                    <strong>Workout Type:</strong> {workout.workoutType}
                  </p>
                  <p>
                    <strong>Workout Minutes:</strong> {workout.workoutMinutes}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {paginatedUsernames.map((username) => {
              const userWorkouts = workouts.filter((workout) => workout.username === username);
              const { workoutType, workoutMinutes } = userWorkouts[0]; // Assuming the first workout defines the type and minutes

              return (
                <li key={username} className="mb-2">
                  <div
                    className="p-2 border rounded cursor-pointer text-blue-500"
                    onClick={() => handleUserClick(username)}
                  >
                    <p>
                      <strong>Username:</strong> {username}
                    </p>
                    <p>
                      <strong>Workout Type:</strong> {workoutType}
                    </p>
                    <p>
                      <strong>Workout Minutes:</strong> {workoutMinutes}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default WorkoutList;

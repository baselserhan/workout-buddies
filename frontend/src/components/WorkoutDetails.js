import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    Swal.fire({
      icon: "question",
      title: "Delete Workout!",
      text: "Are you sure?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CF0A0A",
      cancelButtonColor: "#B2B2B2",
      confirmButtonText: "Delete",
      cancelButtonText: "deny",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!user) {
          return;
        }

        const response = await fetch("/api/workouts/" + workout._id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "DELETE_WORKOUT", payload: json });
          Swal.fire({
            icon: "success",
            title: "Great!",
            text: "Workout deleted successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        style={{ color: "var(--error)" }}
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
}

export default WorkoutDetails;

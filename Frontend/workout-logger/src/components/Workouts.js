import React, { useEffect, useState } from "react";
import Workout from "./Workout";

const Workouts = ({ token }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkots = async () => {
      if (token) {
        const workouts = await fetchWorkouts();
        if (workouts) setWorkouts(workouts);
      }
    };
    getWorkots();
  }, [token]);

  async function fetchWorkouts() {
    try {
      const response = await fetch("http://localhost:3000/workouts/", {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const w = await response.json();
      console.log(w);
      return w;
    } catch (err) {
      return null;
    }
  }

  console.log("workouts is" + typeof workouts);
  const workoutElments = workouts.map((e) => <Workout workout={e} />);

  return (
    <div>
      <h2>Workouts sec</h2>
      {workoutElments}
    </div>
  );
};

export default Workouts;

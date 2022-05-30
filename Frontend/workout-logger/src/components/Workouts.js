import React, { useEffect, useState, useContext } from "react";
import { fetchWorkouts } from "../networking/Networking";
import WorkoutList from "./WorkoutList";
import { getMuscles, getWorkoutCategories } from "../networking/Networking";
import WorkoutSearch from "./WorkoutSearch";
import UserContext from "../UserContext";

const Workouts = ({ addable, handleChange }) => {
  const [user] = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsOrig, setWorkoutsOrig] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllMuscles = async () => {
      if (user.token) {
        const m = await getMuscles(user.token);
        if (m) setMuscles(m);
      } else {
      }
    };
    getAllMuscles();
  }, [user.token]);

  useEffect(() => {
    const getAllCategories = async () => {
      if (user.token) {
        const c = await getWorkoutCategories(user.token);
        if (c) setCategories(c);
      }
    };
    getAllCategories();
  }, [user.token]);

  useEffect(() => {
    const getWorkots = async () => {
      if (user.token) {
        const workouts = await fetchWorkouts(user.token);
        if (workouts) {
          setWorkouts(workouts);
          setWorkoutsOrig(workouts);
        }
      } else {
        setWorkouts([]);
      }
    };
    getWorkots();
  }, [user.token]);

  function onFilter(filter) {
    let w = workoutsOrig;
    if (filter.name && filter.name.length > 1) {
      w = w.filter((e) => e.name.includes(filter.name));
    }
    if (filter.muscles) {
      w = w.filter((e) => e.muscles == filter.muscles);
    }

    if (filter.category) {
      w = w.filter((e) => e.category == filter.category);
    }
    setWorkouts(w);
  }

  return (
    user.token && (
      <>
        <WorkoutSearch
          muscles={muscles}
          categories={categories}
          filter={onFilter}
        />
        <WorkoutList
          workouts={workouts}
          addable={addable}
          handleChange={handleChange}
        />
      </>
    )
  );
};

export default Workouts;

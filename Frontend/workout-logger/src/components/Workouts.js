import React, { useEffect, useState } from "react";
import { fetchWorkouts } from "../networking/Networking";
import WorkoutList from "./WorkoutList";
import { getMuscles, getWorkoutCategories } from "../networking/Networking";
import WorkoutSearch from "./WorkoutSearch";

const Workouts = ({ token, addable, handleChange }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutsOrig, setWorkoutsOrig] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllMuscles = async () => {
      const m = await getMuscles(token);
      setMuscles(m);
    };
    getAllMuscles();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      const c = await getWorkoutCategories(token);
      setCategories(c);
    };
    getAllCategories();
  }, []);

  useEffect(() => {
    const getWorkots = async () => {
      if (token) {
        const workouts = await fetchWorkouts(token);
        if (workouts) {
          setWorkouts(workouts);
          setWorkoutsOrig(workouts);
        }
      } else {
        setWorkouts([]);
      }
    };
    getWorkots();
  }, [token]);

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
  );
};

export default Workouts;

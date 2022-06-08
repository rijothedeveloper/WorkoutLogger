import React, { useEffect, useState, useContext } from "react";
import { fetchWorkouts } from "../networking/Networking";
import WorkoutList from "./WorkoutList";
import { getMuscles, getAllWorkoutEquipments } from "../networking/Networking";
import WorkoutSearch from "./WorkoutSearch";
import UserContext from "../UserContext";

const Workouts = ({ addable, handleChange }) => {
  const [user] = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsOrig, setWorkoutsOrig] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);

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
    const getAllEquipments = async () => {
      if (user.token) {
        const e = await getAllWorkoutEquipments(user.token);
        if (e) setEquipments(e);
      }
    };
    getAllEquipments();
  }, [user.token]);

  useEffect(() => {
    const getWorkots = async () => {
      if (user.token) {
        const workouts = await fetchWorkouts(user.token);
        if (workouts && !workouts.error) {
          setWorkouts(workouts);
          setWorkoutsOrig(workouts);
        }
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

    if (filter.equipment) {
      w = w.filter((e) => e.equipment == filter.equipment);
    }
    setWorkouts(w);
  }

  return (
    user.token && (
      <>
        <WorkoutSearch
          muscles={muscles}
          equipments={equipments}
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

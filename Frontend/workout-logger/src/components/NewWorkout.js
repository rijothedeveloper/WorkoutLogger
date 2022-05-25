import React, { useState, useEffect } from "react";
import { getMuscles, getWorkoutCategories } from "../networking/Networking";
import NewWorkoutForm from "./NewWorkoutForm";

const NewWorkout = ({ token }) => {
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

  return <NewWorkoutForm muscles={muscles} categories={categories} />;
};

export default NewWorkout;

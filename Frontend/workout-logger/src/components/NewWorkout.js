import React, { useState, useEffect } from "react";
import {
  addWorkout,
  getMuscles,
  getWorkoutCategories,
} from "../networking/Networking";
import NewWorkoutForm from "./NewWorkoutForm";

const NewWorkout = ({ token, setFlashMessage }) => {
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

  const saveWorkout = async (formData) => {
    const result = await addWorkout(token, formData);
    if (result.id) {
      setFlashMessage({
        show: true,
        message: "Save workout sucessfully with id " + result.id,
        color: "green",
      });
    } else {
      setFlashMessage({
        show: true,
        message: "Error in saving workout ",
        color: "red",
      });
    }
  };

  return (
    <NewWorkoutForm
      muscles={muscles}
      categories={categories}
      addWorkout={saveWorkout}
    />
  );
};

export default NewWorkout;

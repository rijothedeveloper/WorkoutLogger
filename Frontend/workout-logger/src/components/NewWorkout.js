import React, { useState, useEffect, useContext } from "react";
import {
  addWorkout,
  getMuscles,
  getWorkoutCategories,
} from "../networking/Networking";
import NewWorkoutForm from "./NewWorkoutForm";
import UserContext from "../UserContext";

const NewWorkout = ({ setFlashMessage }) => {
  const [muscles, setMuscles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const getAllMuscles = async () => {
      const m = await getMuscles(user.token);
      setMuscles(m);
    };
    getAllMuscles();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      const c = await getWorkoutCategories(user.token);
      setCategories(c);
    };
    getAllCategories();
  }, []);

  const saveWorkout = async (formData) => {
    const result = await addWorkout(user.token, formData);
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

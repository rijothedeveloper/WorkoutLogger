import React, { useState, useEffect, useContext } from "react";
import {
  addWorkout,
  getAllWorkoutEquipments,
  getMuscles,
} from "../networking/Networking";
import NewWorkoutForm from "./NewWorkoutForm";
import UserContext from "../UserContext";

const NewWorkout = ({ setFlashMessage }) => {
  const [muscles, setMuscles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const getAllMuscles = async () => {
      const m = await getMuscles(user.token);
      setMuscles(m);
    };
    getAllMuscles();
  }, []);

  useEffect(() => {
    const getAllEquipments = async () => {
      const e = await getAllWorkoutEquipments(user.token);
      setEquipments(e);
    };
    getAllEquipments();
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
      allMuscles={muscles}
      allEquipments={equipments}
      addWorkout={saveWorkout}
    />
  );
};

export default NewWorkout;

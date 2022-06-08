import React, { useState } from "react";

const NewWorkoutForm = ({ allMuscles, allEquipments, addWorkout }) => {
  const muscleOptions = allMuscles.map((m) => (
    <label>
      {m.name}
      <input
        type="checkbox"
        name={m.name}
        value={m.id}
        onChange={handleMuscleCheck}
      />
    </label>
  ));
  const equipmentsOptions = allEquipments.map((e) => (
    <label>
      {e.name}
      <input
        type="checkbox"
        name={e.name}
        value={e.id}
        onChange={handleEquipmentCheck}
      />
    </label>
  ));

  const [formData, setFormData] = useState({});
  const [muscles, setMuscles] = useState({});
  const [equipments, setEquipments] = useState({});

  function handleMuscleCheck(event) {
    console.log("checked");
    setMuscles({
      ...muscles,
      [event.target.value]: event.target.checked,
    });
  }

  function handleEquipmentCheck(event) {
    console.log("checked");
    setEquipments({
      ...equipments,
      [event.target.value]: event.target.checked,
    });
  }

  const onChangeForm = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    formData["muscles"] = createMuscleArray(muscles);
    formData["equipments"] = createEquipmentsArray(equipments);
    addWorkout(formData);
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
    });
  };

  function createMuscleArray(muscles) {
    const muscleArr = [];
    for (let muscleId in muscles) {
      if (muscles[muscleId]) {
        muscleArr.push(muscleId);
      }
    }
    return muscleArr;
  }

  function createEquipmentsArray(equipments) {
    const equipmentArr = [];
    for (let equipmentId in equipments) {
      if (equipments[equipmentId]) {
        equipmentArr.push(equipmentId);
      }
    }
    return equipmentArr;
  }

  return (
    <form method="post" onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChangeForm}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={onChangeForm}
        />
      </label>
      <label>
        Image Url:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onChangeForm}
        />
      </label>
      <label>
        Video Url:
        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={onChangeForm}
        />
      </label>
      <h3>Choose Muscle:</h3>
      {muscleOptions}
      <h3>Choose equipments:</h3>
      {equipmentsOptions}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewWorkoutForm;

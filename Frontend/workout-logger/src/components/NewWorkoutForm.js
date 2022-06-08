import React, { useState } from "react";

const NewWorkoutForm = ({ muscles, equipments, addWorkout }) => {
  const muscleOptions = muscles.map((m) => (
    <option value={m.id} key={m.id}>
      {m.name}
    </option>
  ));
  const equipmentsOptions = equipments.map((c) => (
    <option value={c.id} key={c.id}>
      {c.name}
    </option>
  ));

  const [formData, setFormData] = useState({
    category: 1,
    muscle: 1,
  });

  const onChangeForm = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addWorkout(formData);
    setFormData({
      name: "",
      category: 1,
      muscle: 1,
      description: "",
      imageUrl: "",
      videoUrl: "",
    });
  };

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
        Choose equipments:
        <select
          name="equipment"
          value={formData.equipment}
          onChange={onChangeForm}
        >
          {" "}
          {equipmentsOptions}{" "}
        </select>
      </label>
      <label>
        Choose Muscle:
        <select name="muscle" value={formData.muscle} onChange={onChangeForm}>
          {" "}
          {muscleOptions}{" "}
        </select>
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewWorkoutForm;

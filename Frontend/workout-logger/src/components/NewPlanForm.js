import React, { useState } from "react";
import Workouts from "./Workouts";

const NewPlanForm = ({ savePlan, levels, tags }) => {
  const [formData, setFormData] = useState({});
  const [workouts, setWorkouts] = useState(new Set());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleWorkoutChange = (id, add) => {
    if (add) {
      workouts.add(id);
    } else {
      workouts.delete(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const plan = {
      ...formData,
      workouts: Array.from(workouts),
    };
    savePlan(plan);
    setWorkouts(new Set());
    setFormData({
      ...formData,
      ["name"]: "",
      ["notes"]: "",
    });
  };

  const handleTagsCheck = () => {};

  const levelElm = levels.map((l) => <option value={l.id}>{l.name}</option>);

  const tagOptions = tags.map((t) => (
    <label>
      {t.name}
      <input
        type="checkbox"
        name={t.name}
        value={t.id}
        onChange={handleTagsCheck}
      />
    </label>
  ));

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
        />
      </label>
      <label>
        Select Level:
        <select>{levelElm}</select>
      </label>
      <div className="box">
        <h3>Choose tags:</h3>
        <div className="inline-options">{tagOptions}</div>
      </div>
      <div className="box">
        <h3>Choose the workouts</h3>
        <Workouts addable={true} handleChange={handleWorkoutChange} />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewPlanForm;

import React, { useState } from "react";

const WorkoutSearch = ({ muscles, categories, filter }) => {
  const muscleOptions = muscles.map((m) => (
    <option value={m.id}>{m.name}</option>
  ));
  const categoryOptions = categories.map((c) => (
    <option value={c.id}>{c.name}</option>
  ));
  const [formData, setFormData] = useState({});
  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    filter(formData);
  };
  return (
    <div className="searchBox">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
      </label>
      <label>
        Choose Category:
        <select name="category" value={formData.category} onChange={onChange}>
          {" "}
          {categoryOptions}{" "}
        </select>
      </label>
      <label>
        Choose Muscle:
        <select name="muscles" value={formData.muscle} onChange={onChange}>
          {" "}
          {muscleOptions}{" "}
        </select>
      </label>
    </div>
  );
};

export default WorkoutSearch;

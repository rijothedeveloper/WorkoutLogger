import React, { useState } from "react";

const WorkoutSearch = ({ muscles, categories, filter }) => {
  const muscleOptions = muscles.map((m) => (
    <option value={m.id} key={m.id}>
      {m.name}
    </option>
  ));
  const categoryOptions = categories.map((c) => (
    <option value={c.id} key={c.id}>
      {c.name}
    </option>
  ));
  const [formData, setFormData] = useState({});
  const onChange = (event) => {
    const data = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data);
    filter(data);
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
          <option />
          {categoryOptions}
        </select>
      </label>
      <label>
        Choose Muscle:
        <select name="muscles" value={formData.muscle} onChange={onChange}>
          <option />
          {muscleOptions}
        </select>
      </label>
    </div>
  );
};

export default WorkoutSearch;

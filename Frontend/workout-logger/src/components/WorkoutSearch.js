import React, { useState } from "react";

const WorkoutSearch = ({ muscles, equipments, filter }) => {
  const muscleOptions = muscles.map((m) => (
    <option value={m.id} key={m.id}>
      {m.name}
    </option>
  ));
  const equipmentsOptions = equipments.map((e) => (
    <option value={e.id} key={e.id}>
      {e.name}
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
        Choose equipment:
        <select name="equipment" value={formData.equipment} onChange={onChange}>
          <option />
          {equipmentsOptions}
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

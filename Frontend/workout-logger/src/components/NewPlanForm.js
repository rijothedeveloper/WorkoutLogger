import React, { useState } from "react";
import Workouts from "./Workouts";

const NewPlanForm = ({ savePlan }) => {
  const [formData, setFormData] = useState({});
  const [days, setDays] = useState(new Array(7).fill(false));
  const [workouts, setWorkouts] = useState(new Set());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckedChange = (position) => {
    const updatedDays = days.map((item, index) =>
      index === position ? !item : item
    );
    setDays(updatedDays);
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
      days: {
        sun: days[0],
        mon: days[1],
        tue: days[2],
        wed: days[3],
        thu: days[4],
        fri: days[5],
        sat: days[6],
      },
      workouts: Array.from(workouts),
    };
    savePlan(plan);
    setDays(new Array(7).fill(false));
    setWorkouts(new Set());
    setFormData({
      ...formData,
      ["name"]: "",
      ["notes"]: "",
    });
  };

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
      <h3>Choos the days to do exercise</h3>
      <div class="checkArea">
        <label>
          Sunday:
          <input
            type="checkbox"
            name="sunday"
            checked={days[0]}
            onChange={() => handleCheckedChange(0)}
          />
        </label>
        <label>
          Munday:
          <input
            type="checkbox"
            name="monday"
            checked={days[1]}
            onChange={() => handleCheckedChange(1)}
          />
        </label>
        <label>
          Tuesday:
          <input
            type="checkbox"
            name="tuesday"
            checked={days[2]}
            onChange={() => handleCheckedChange(2)}
          />
        </label>
        <label>
          Wednesday:
          <input
            type="checkbox"
            name="notes"
            checked={days[3]}
            onChange={() => handleCheckedChange(3)}
          />
        </label>
        <label>
          Thursday:
          <input
            type="checkbox"
            name="notes"
            checked={days[4]}
            onChange={() => handleCheckedChange(4)}
          />
        </label>
        <label>
          Friday:
          <input
            type="checkbox"
            name="notes"
            checked={days[5]}
            onChange={() => handleCheckedChange(5)}
          />
        </label>
        <label>
          Saturday:
          <input
            type="checkbox"
            name="notes"
            checked={days[6]}
            onChange={() => handleCheckedChange(6)}
          />
        </label>
      </div>
      <Workouts addable={true} handleChange={handleWorkoutChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewPlanForm;

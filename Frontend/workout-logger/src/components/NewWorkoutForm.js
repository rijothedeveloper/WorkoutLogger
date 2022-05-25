import React from "react";

const NewWorkoutForm = ({ muscles, categories }) => {
  const muscleOptions = muscles.map((m) => (
    <option value={m.id}>{m.name}</option>
  ));
  const categoryOptions = categories.map((c) => (
    <option value={c.id}>{c.name}</option>
  ));
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Choose Category:
        <select> {categoryOptions} </select>
      </label>
      <label>
        Choose Muscle:
        <select> {muscleOptions} </select>
      </label>
      <label>
        Description:
        <input type="text" name="description" />
      </label>
      <label>
        Image Url:
        <input type="text" name="imageUrl" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewWorkoutForm;

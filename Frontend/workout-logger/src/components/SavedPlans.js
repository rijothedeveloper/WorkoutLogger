import React from "react";

function SavedPlans({ token }) {
  return (
    <div>
      <h2>My Plans</h2>
      {token && <button>create a plan</button>}
    </div>
  );
}

export default SavedPlans;

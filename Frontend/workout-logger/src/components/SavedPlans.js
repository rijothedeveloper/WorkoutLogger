import React from "react";

function SavedPlans({ plans, loggedIn }) {
  let planElements;
  if (plans) {
    planElements = plans.map((plan) => <h2>{plan.name}</h2>);
  }

  return (
    <div>
      <h2>My Plans</h2>
      {loggedIn && <button>create a plan</button>}
      {planElements}
    </div>
  );
}

export default SavedPlans;

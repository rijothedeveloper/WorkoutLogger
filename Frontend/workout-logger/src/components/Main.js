import { useEffect, useState } from "react";

const Main = ({ token }) => {
  const [plans, setPlans] = useState("");
  async function fetchPlans(token) {
    try {
      const response = await fetch("http://localhost:3000/workouts/plan", {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const plans = await response.json();
      console.log(plans);
      return plans;
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    const getPlans = async () => {
      if (token) {
        const plans = await fetchPlans(token);
        setPlans(plans);
      }
    };
    getPlans();
  }, [token]);

  let planElements;
  if (plans) {
    planElements = plans.map((plan) => <h2>{plan.name}</h2>);
  }

  if (!token) {
    return <h2>main area</h2>;
  } else {
    return (
      <div>
        <button>create a plan</button>
        {planElements}
      </div>
    );
  }
};

export default Main;

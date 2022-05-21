import Plan from "./Plan";
import { useState, useEffect } from "react";

const Plans = ({ token }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const getPlans = async () => {
      if (token) {
        const plans = await fetchPlans(token);
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [token]);

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

  const planElements = plans.map((e) => <Plan plan={e} />);

  return (
    <div>
      <h2>Plans sec</h2>
      {planElements}
    </div>
  );
};

export default Plans;

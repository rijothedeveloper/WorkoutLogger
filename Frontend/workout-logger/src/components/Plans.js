import Plan from "./Plan";
import { fetchPlans } from "../networking/Networking";
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

  const planElements = plans.map((e) => <Plan plan={e} />);

  return (
    <div>
      <h2>Plans sec</h2>
      <div className="card-raw">{planElements}</div>
    </div>
  );
};

export default Plans;

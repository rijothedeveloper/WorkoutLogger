import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlan } from "../networking/Networking";
import UserContext from "../UserContext";
import PlansInfo from "./PlansInfo";

const PlanDetails = () => {
  const [user] = useContext(UserContext);
  const { planId } = useParams();
  const [plan, setPlan] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (user.token) {
        const planDetails = await fetchPlan(user.token, planId);
        setPlan(planDetails);
      }
    };
    fetchPlanDetails();
  }, []);

  return (
    <div>
      <h2>PlanDetails</h2>
      <h3>name: {plan.name} </h3>
      <h3>notes: {plan.notes} </h3>
      <h3>workouts</h3>
    </div>
  );
};

export default PlanDetails;

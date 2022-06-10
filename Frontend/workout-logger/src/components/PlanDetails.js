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

  if (!user.token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchPlanDetails = async () => {
      const planDetails = await fetchPlan(user.token, planId);
      setPlan(planDetails);
    };
    if (user.token) fetchPlanDetails();
  }, [user.token, planId]);
  let workElem;
  if (plan.workouts) {
    workElem = plan.workouts.map((e) => <h4>{e.name}</h4>);
  }

  return (
    <div>
      <h2>PlanDetails</h2>
      <h3>name: {plan.name} </h3>
      <h3>notes: {plan.notes} </h3>
      <h3>Sunday: {plan.sun ? "Yes" : "No"}</h3>
      <h3>Monday: {plan.mon ? "Yes" : "No"}</h3>
      <h3>Tuesday: {plan.tue ? "Yes" : "No"}</h3>
      <h3>Wednesday: {plan.wed ? "Yes" : "No"}</h3>
      <h3>Thursday: {plan.thu ? "Yes" : "No"}</h3>
      <h3>Friday: {plan.fri ? "Yes" : "No"}</h3>
      <h3>Saturday: {plan.sat ? "Yes" : "No"}</h3>
      <h3>workouts</h3>

      <PlansInfo plan={workElem} />
    </div>
  );
};

export default PlanDetails;

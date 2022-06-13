import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlan } from "../networking/Networking";
import UserContext from "../UserContext";
import PlansInfo from "./PlansInfo";
import WorkoutList from "./WorkoutList";

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
  }, [user.token, planId]);

  let tagElements;
  let workoutElm;
  if (plan.tags) {
    tagElements = plan.tags.map((t) => <span className="tag">{t + ", "}</span>);
    workoutElm = (
      <WorkoutList
        workouts={plan.workouts}
        addable={false}
        handleChange={null}
      />
    );
  }

  return (
    <>
      <div className="titleBar">
        <div className="canvas">
          <h1>{plan.name}</h1>
          <h4 className="subtitle">{tagElements}</h4>
        </div>
      </div>
      <div className="workouts-sec">{workoutElm}</div>
      <div className="workout-des">
        <h2>{plan.name}</h2>
        <p>{plan.notes}</p>
        <img src={plan.imgurl} alt={plan.name} />
      </div>
    </>
  );
};

export default PlanDetails;

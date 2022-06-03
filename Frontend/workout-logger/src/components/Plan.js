import { Link } from "react-router-dom";
import fitnessImage from "../images/fitness.jpeg";

const Plan = ({ plan }) => {
  return (
    <div className="card">
      <Link to={"/plans/" + plan.id}>
        <figure>
          {plan.imgurl ? (
            <img src={plan.imgurl} height="200px" />
          ) : (
            <img src={fitnessImage} height="200px" />
          )}
          <figcaption>
            <h3>{plan.name}</h3>
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default Plan;

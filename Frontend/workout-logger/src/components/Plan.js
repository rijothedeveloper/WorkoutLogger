import fitnessImage from "../images/fitness.jpeg";

const Plan = ({ plan }) => {
  return (
    <div className="card">
      <figure>
        <img src={fitnessImage} height="200px" />
        <figcaption>
          <h3>{plan.name}</h3>
        </figcaption>
      </figure>
    </div>
  );
};

export default Plan;

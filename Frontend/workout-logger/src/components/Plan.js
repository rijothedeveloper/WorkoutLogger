import fitnessImage from "../images/fitness.jpeg";

const Plan = ({ plan }) => {
  return (
    <div className="card">
      <figure>
        {plan.image_url ? (
          <img src={plan.image_url} height="200px" />
        ) : (
          <img src={fitnessImage} height="200px" />
        )}
        <figcaption>
          <h3>{plan.name}</h3>
        </figcaption>
      </figure>
    </div>
  );
};

export default Plan;

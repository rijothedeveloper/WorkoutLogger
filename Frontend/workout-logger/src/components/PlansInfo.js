import Plan from "./Plan";

const PlansInfo = ({ plans }) => {
  const planElements = plans.map((e) => <Plan plan={e} />);

  return (
    <div>
      <h2>Plans sec</h2>
      <div className="card-raw">{planElements}</div>
    </div>
  );
};

export default PlansInfo;

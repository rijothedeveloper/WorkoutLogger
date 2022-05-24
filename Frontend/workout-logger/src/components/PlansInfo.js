import Plan from "./Plan";

const PlansInfo = ({ plans }) => {
  const planElements = plans.map((e) => <Plan plan={e} key={e.id} />);

  return <div className="card-raw">{planElements}</div>;
};

export default PlansInfo;

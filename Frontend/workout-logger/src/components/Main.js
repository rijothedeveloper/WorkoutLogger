const Main = ({ plans }) => {
  let planElements;
  if (plans) {
    planElements = plans.map((plan) => <h2>{plan.name}</h2>);
  }

  if (!plans) {
    return <h2>main area</h2>;
  } else {
    return (
      <div>
        <button>create a plan</button>
        {planElements}
      </div>
    );
  }
};

export default Main;

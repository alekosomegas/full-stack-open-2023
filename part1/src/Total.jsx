const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises.reduce((acc, val) => {
        return acc + val;
      }, 0)}
    </p>
  );
};

export default Total;

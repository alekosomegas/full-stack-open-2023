const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts.reduce((acc, val) => {
        return acc + val.exercises;
      }, 0)}
    </p>
  );
};

export default Total;

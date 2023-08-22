const Content = (props) => {
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    );
  };

  return (
    <>
      {props.parts.map((part, i) => {
        return <Part key={i} part={part} exercise={props.exercises[i]} />;
      })}
    </>
  );
};

export default Content;

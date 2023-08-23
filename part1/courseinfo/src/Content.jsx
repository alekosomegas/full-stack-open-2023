const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {

  return (
    <>
      {props.course.parts.map((part, i) => {
        return <Part key={i} part={part}/>;
      })}
    </>
  );
};

export default Content;

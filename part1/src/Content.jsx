const Content = (props) => {
  console.log(props);
  return (
    <>
      {props.parts.map((part, i) => {
        return (
          <p key={i}>
            {part} {props.exercises[i]}
          </p>
        );
      })}
    </>
  );
};

export default Content;

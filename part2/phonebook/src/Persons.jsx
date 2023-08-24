const Persons = ({ filteredData }) => {
  return (
    <>
      {filteredData.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;

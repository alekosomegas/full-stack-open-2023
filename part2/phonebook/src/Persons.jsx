const Persons = ({ persons, searchTerm, handleDelete }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number} {""}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        ))}
    </>
  );
};

export default Persons;

import { useState, useEffect } from "react";
import services from "./services";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    services
      .getAll()
      .then((result) => {
        setPersons(result);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "") return;
    const duplicatePerson = persons.find((person) => person.name === newName);
    if (duplicatePerson) {
      const confirmed = confirm(
        newName +
          " is already added to the phonebook, replace the old number with the new one?"
      );
      if (confirmed) {
        const newPerson = { ...duplicatePerson, number: newNumber };
        services.update(duplicatePerson.id, newPerson);
        setPersons((prev) => {
          return prev.map((p) => (p.id !== newPerson.id ? p : newPerson));
        });
      } else return;
    } else {
      const lastId = persons.reduce(
        (maxId, person) => Math.max(maxId, person.id),
        0
      );
      const newPerson = { name: newName, number: newNumber, id: lastId + 1 };
      services.create(newPerson)
      .then(createdPerson => {
        setPersons((prev) => {
          return [...prev, newPerson];
        });
        setMessage(`Added ${newPerson.name}`);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.message)
        setError(true)
      })


      setTimeout(() => {
        setError(false)
        setMessage(null);
      }, 5000);
    }

    setNewName("");
    setNewNumber("");
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleDelete = (person) => {
    const confirmed = confirm(`Delete ${person.name} ?`);
    if (confirmed) {
      services
        .remove(person.id)
        .then((res) => console.log(res))
        .catch((err) => {
          setMessage(
            `Information of ${person.name} has already been removed from server`
          ),
            setError(true),
            setTimeout(() => {
              setError(false);
              setMessage(null);
            }, 5000);
        });
      setPersons((prev) => prev.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message} error={error} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

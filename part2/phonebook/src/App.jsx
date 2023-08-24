import { useState, useEffect } from "react";
import services from "./services";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    services.getAll()
      .then((result) => {
        setPersons(result)
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
    if (persons.find((person) => person.name === newName)) {
      alert(newName + " is already added to the phonebook");
      return;
    }
    const lastId = persons.reduce((maxId, person) => Math.max(maxId, person.id), 0)
    const newPerson = { name: newName, number: newNumber, id: lastId + 1 }
    services.create(newPerson)    
    setPersons((prev) => {
      return [...prev, newPerson];
    });

    setNewName("");
    setNewNumber("");
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleDelete = (person) => {
    const confirmed = confirm(`Delete ${person.name} ?`)
    if (confirmed) {
      services.remove(person.id)
      setPersons(prev => prev.filter((p) => p.id !== person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

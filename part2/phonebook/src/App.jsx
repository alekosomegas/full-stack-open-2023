import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((result) => {
        setPersons(result.data)
        setFilteredData(result.data)
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
    setPersons((prev) => {
      setFilteredData([...prev, { name: newName, number: newNumber }]);
      return [...prev, { name: newName, number: newNumber }];
    });
    setNewName("");
    setNewNumber("");
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      persons.filter((person) => person.name.toLowerCase().includes(term))
    );
  };

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
      <Persons filteredData={filteredData} />
    </div>
  );
};

export default App;

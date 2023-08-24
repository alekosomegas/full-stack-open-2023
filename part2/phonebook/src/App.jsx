import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState(persons)

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(newName === "") return
    if (persons.find(person => person.name === newName))  {
      alert(newName + " is already added to the phonebook")
      return
    }
    setPersons(prev => {
      return [
        ...prev,
        {name: newName, tel: newNumber}
      ]
    })
    setNewName("")
    setNewNumber("")
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    setFilteredData(persons.filter(person => person.name.toLowerCase().includes(term)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <label>filter shown with</label>  
      <input value={searchTerm} onChange={handleSearch}/>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredData.map((person) => <p key={person.name}>{person.name} {person.tel}</p>)}
    </div>
  )
}

export default App
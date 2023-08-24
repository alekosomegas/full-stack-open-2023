import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', tel: '1234'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => <p key={person.name}>{person.name} {person.tel}</p>)}
    </div>
  )
}

export default App
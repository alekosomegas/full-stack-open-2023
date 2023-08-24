import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
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
        {name: newName}
      ]
    })
    setNewName("")
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons  from './components/persons'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import PersonService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]=useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage,setSuccessMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    PersonService.getAll().then(initialPersons=>{
      setPersons(initialPersons)
    })
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addperson = (event) => {
    event.preventDefault()
    const newPerson={
      name:newName,
      number:newNumber
    }
    if(persons.some(p => p.name===newName && p.number===newNumber))
    {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }

        PersonService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
          `${existingPerson.name}'s number has been successfully changed`
        )
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
          })
          .catch(error => {
            setErrorMessage(
          `Note '${existingPerson.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      
    }
    else{
      PersonService.create(newPerson)
      .then(createdPerson=>{
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      })
      .catch(error => { 
        setErrorMessage(error.response.data.error)
        setTimeout(()=>{
          setErrorMessage('')
        },3000)
        console.log(error.response.data.error)
      })
      
          
    }
    
    
  }
  const toggleDelete= id =>{
    const person=persons.find(person=>person.id===id)
    PersonService.del(person.id)
    .then(newPersons=>{
      setPersons(newPersons)
    })
  }
  }

  const personFilter= persons.filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))


  const handleChangename=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChangenumber=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleChangeFilter=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errormessage={errorMessage} successmessage={successMessage}/>
      <Filter value={filter} onChange={handleChangeFilter}/>
      
        <h3>add a new</h3>
        <PersonForm submit={addperson} name={newName} number={newNumber} cname={handleChangename} cnumber={handleChangenumber}/>

      <h3>Numbers</h3>
      <Persons persons={personFilter} setPersons={setPersons} />
    </div>
  )
}

export default App
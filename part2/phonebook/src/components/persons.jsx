
import PersonService from '../services/persons'
const Persons = ({ persons,setPersons}) => {
  const toggleDelete= id =>{
    const person=persons.find(person=>person.id===id)
    if(confirm(`Delete ${person.name}`)){
      PersonService.del(person.id)
    .then(()=>{
      setPersons(persons.filter(p => p.id !== id))
    })
    }
    
  }
  return persons.map(person => (
    <Person key={person.name} person={person} toggleDelete={() =>toggleDelete(person.id)}/>
  ))
}

const Person = ({person, toggleDelete})=>{ return <p>{person.name} {person.number} <button onClick={toggleDelete}>delete</button></p>}

export default Persons
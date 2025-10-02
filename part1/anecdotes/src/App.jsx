import { use } from 'react'
import { useState } from 'react'


const Button =({onClick, text})=>{
    return(
      <button onClick={onClick}>{text}</button>
    )
   }

   const DisplayVote=({value})=>{
    return(
      <p>has {value} votes</p>
    )
   }
   const DisplayAnecdote=({text})=>{
    return(
      <p>{text}</p>
    )
   }
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
const [selected, setSelected] = useState(0)
const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
const nextClick=()=>{
  setSelected(Math.floor(Math.random()*(8)))
}
const plusvote=()=>{
  const copy=[...votes]
  copy[selected]+=1
  setVotes(copy)
}
const max=Math.max(...votes)
  return (
    
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]}/>
      <DisplayVote value={votes[selected]}/>
      <Button onClick={plusvote} text='vote'/>
      <Button onClick={nextClick} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote text={anecdotes[votes.indexOf(max)]}/>

    </div>
  )
}

export default App
import { useState } from 'react'

const Button = ({onClick, text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine=({text,value})=>{
  return(
    <tr>
    <td>{text}</td> <td>{value}</td>
    </tr>
  )
}
const Statistics=({good,neutral,bad})=>{
  if(good===0 && neutral===0 && bad===0){
    return(
  <div>No feedback given</div>
  )}
  const all=good+neutral+bad
  const average = (good - bad )/ all
  const positive = ((good)/all)*100
  return(
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive + "%"}/>
        </tbody>
      </table>
  
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick=()=>{
    setGood(good+1)
  }
  const badClick=()=>{
    setBad(bad+1)
  }
  const neutralClick=()=>
  {
    setNeutral(neutral+1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodClick} text='good'/>
      <Button onClick={neutralClick} text='neutral'/>
      <Button onClick={badClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
  return(
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </div>)
}

const Part = ({part}) => {
  return (<p>
    {part.name} {part.exercises}
  </p> )
  
}

const Total = ({parts}) => { 
  var TotalAmount= parts.reduce((sum,part)=>sum + part.exercises,0) 
  return (<p  style={{ fontWeight: 'bold' }}>Number of exercises {TotalAmount}</p>)}

const Course =({course})=>{
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}
export default Course

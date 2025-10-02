import { useState ,useEffect} from 'react'
import './App.css'
import countryService from './services/country'
import Display from './components/Country'
const  App =() => {
  const [country,setCountry] = useState('')
  const [countries,setCountries] = useState([])

  useEffect(()=>{
    countryService.getAll().then(Listcountries=>{
      console.log('promise fulfilled')
      setCountries(Listcountries)
    })
  },[])

  


  const HandleChange=(event)=>{
    setCountry(event.target.value)
    console.log(country);
    
  }

  const countriesfilter= countries.filter(c => c.name.common.toLowerCase().startsWith(country.toLowerCase()))

  return (
    <div>
      find countries<input type="text" value={country} onChange={HandleChange}></input>
      <Display countries={countriesfilter}/>
    </div>
  )
}

export default App

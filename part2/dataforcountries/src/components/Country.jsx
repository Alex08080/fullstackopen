import { useState, useEffect } from 'react';
import Weather from './Weather';

const Display = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  
  useEffect(() => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0]);
    }
    else{
      setSelectedCountry(null)
    }
  }, [countries])

  const handleShow = (id) => {
    const c = countries.find(p => p.cca3 === id); 
    setSelectedCountry(c);
  };

  if (selectedCountry) {
    const c = selectedCountry;
    return (
      <div>
        <h1>{c.name.common}</h1>
        
        <p>Capital: {c.capital?.[0]}</p>
        <p>Area: {c.area} km²</p>
        <p>Languages:</p>
        <ul>
          {Object.values(c.languages || {}).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={c.flags.png} alt={c.flags.alt} width="150" />
        <Weather capital={c.capital?.[0]}/>
      </div>
    );
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <ul>
      {countries.map(c => (
        <Country
          key={c.cca3}
          id={c.cca3}
          name={c.name.common}
          onShow={handleShow}
        />
      ))}
    </ul>
  );
};

const Country = ({ name, id, onShow }) => (
  <li>
    {name} <button onClick={() => onShow(id)}>Show</button>
  </li>
);

export default Display;

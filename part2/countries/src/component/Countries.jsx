const Countries = ({countries,onShowCountries}) =>{
    if(countries === null) return null
    if(countries.length === 0){
        return null
    }
    return (
     <ul>
         {countries.map((country) => (
             <li key={country.name.common}>{country.name.common} <button onClick={() => onShowCountries(country.name.common)}>Show</button></li>
         ))}
     </ul>
    )
}

export default Countries;
import { useState, useEffect } from 'react'
import countriesService from './service/countries.js'
import Countries from "./component/Countries.jsx";
import Search from "./component/Search.jsx";
import Countrie from "./component/Countrie.jsx";

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesShow, setcountriesShow] = useState([])
  useEffect(() => {
    countriesService.getAll()
      .then(response => {
        console.log(response)
        setCountries(response)
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const searchValue = event.target.value.toLowerCase();
    const searchCountries = countries.filter(countrie => {
      const commonName = countrie.name.common.toLowerCase();
      return commonName.includes(searchValue);
    });
    if (searchCountries.length <= 10 && searchCountries.length >= 1) {
      setcountriesShow(searchCountries)
    } else {
      setcountriesShow([])
    }
  };

  const onShowCountries = (name) => {
    const nameshow = name.toLowerCase();
    const countriName = countriesShow.filter(countrie => {
      const commonName = countrie.name.common.toLowerCase();
      return commonName.includes(nameshow);
    })

    setcountriesShow(countriName)
  }
  return (
    <div>
      <h3>Search for a country to obtain information about it</h3>
      <Search search={search} handleSearchChange={handleSearchChange}></Search>
      {countriesShow.length === 1 ? <Countrie countries={countriesShow}></Countrie> : <Countries onShowCountries={onShowCountries} countries={countriesShow}></Countries>}
    </div>
  )
}

export default App

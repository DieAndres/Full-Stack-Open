const Countrie = ({countries}) =>{
    if(countries === null) return null
    const countrie = countries[0]
    const lang = countrie.languages
    return(
        <div>
            <h1>{countrie.name.common}</h1>
            <h3>Capital: {countrie.capital}</h3>
            <h3>Area : {countrie.area}</h3>
            <h3>Languages: </h3>
            <ul>
                {Object.values(lang).map((languege,index) => (
                    <li key={index}>{languege}</li>
                ))}
            </ul>

            <img src={countrie.flags.png} alt={`Flag of ${countrie.name.common}`} />
        </div>
    )
}

export default Countrie;
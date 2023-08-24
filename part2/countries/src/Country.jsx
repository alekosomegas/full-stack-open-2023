const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <div>
        <h3>languages:</h3>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  );
};

export default Country;

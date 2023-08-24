import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const onSearchInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchResults([]);
      return;
    }

    setSearchResults(
      data.filter((country) => {
        const name = country.name.common.toLowerCase();
        return name.includes(term.toLowerCase());
      })
    );
  };

  return (
    <>
      <div>
        <label>find countries </label>
        <input value={searchTerm} onChange={onSearchInputChange} />
      </div>
      <div>
        {searchResults.length <= 10 ? (
          searchResults.length === 1 ? (
            <Country country={searchResults[0]} />
          ) : (
            searchResults.map((country) => (
              <p key={country.name.official}>{country.name.common}</p>
            ))
          )
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </>
  );
}

export default App;

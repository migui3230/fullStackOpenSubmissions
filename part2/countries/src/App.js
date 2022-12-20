import { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = ({ value, changeHandler }) => {
  return (
    <>
      find countries
      <form>
        <input
          type="text"
          name="search"
          placeholder="Search for a country"
          value={value}
          onChange={changeHandler}
        />
      </form>
    </>
  );
};

const SingleCountry = ({
  countries,
  selectedCountry,
  clearSelectedCountry,
}) => {
  if (selectedCountry) {
    return (
      <>
        <button onClick={clearSelectedCountry}>
          Go back to multiple countries
        </button>
        <h1>{selectedCountry.name.common}</h1>
        <p>capital {selectedCountry.capital[0]}</p>
        <p>area {selectedCountry.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(selectedCountry.languages).map((language) => {
            return <li>{language}</li>;
          })}
        </ul>
        <img
          src={selectedCountry.flags["png"]}
          alt={selectedCountry.name.common + " flag"}
        />
      </>
    );
  }

  return (
    <>
      <h1>{countries[0].name.common}</h1>
      <p>capital {countries[0].capital[0]}</p>
      <p>area {countries[0].area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(countries[0].languages).map((language) => {
          return <li>{language}</li>;
        })}
      </ul>
      <img
        src={countries[0].flags["png"]}
        alt={countries[0].name.common + " flag"}
      />
    </>
  );
};

const MultipleCountries = ({
  countries,
  setSelectedCountry,
  selectedCountry,
  clearSelectedCountry,
}) => {
  if (selectedCountry) {
    return (
      <SingleCountry
        selectedCountry={selectedCountry}
        countries={countries}
        clearSelectedCountry={clearSelectedCountry}
      />
    );
  }

  return (
    <>
      {countries.map((country) => {
        return (
          <>
            <p key={country.name.common}>{country.name.common}</p>
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </>
        );
      })}
    </>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  // console.log(countries[0]);
  // console.log(searchTerm);
  // console.log(selectedCountry);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSelectedCountry = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const filteredCountries = response.data.filter((country) => {
        return country.name.common.toLowerCase().includes(searchTerm);
      });
      setCountries(filteredCountries);
    });
  }, [searchTerm]);

  return (
    <>
      <SearchForm value={searchTerm} changeHandler={searchHandler} />

      {searchTerm && countries.length === 1 ? (
        <SingleCountry countries={countries} />
      ) : null}

      {searchTerm && countries.length > 1 && countries.length < 10 ? (
        <MultipleCountries
          countries={countries}
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          clearSelectedCountry={clearSelectedCountry}
        />
      ) : null}

      {searchTerm && countries.length > 10 ? (
        <>Too many matches, specify another filter</>
      ) : null}

      {searchTerm && countries.length === 0 ? <>no countries matched!</> : null}
    </>
  );
};

export default App;

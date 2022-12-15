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

const SingleCountry = ({ searchTerm, searchHandler, countries }) => {
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

const MultipleCountries = ({ searchTerm, searchHandler, countries }) => {
  return (
    <>
      {countries.map((country) => {
        return <p>{country.name.common}</p>;
      })}
    </>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  console.log(countries[0]);
  // console.log(searchTerm);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const filteredCountries = response.data.filter((country) => {
        return country.name.common.toLowerCase().includes(searchTerm);
      });
      setCountries(filteredCountries);
    });
  }, [searchTerm]);

  // TODO: ask chatgpt, github copilot, and the react discord to find a way to make this code cleaner and more refactored

  // TODO: refactor code from lines 44 to 98

  // separate code into components for single country view, invalid size view, and multiple country view (create a prop boolean to show the show button for a single country view when pressed)

  // TODO: render the default search form as the last thing after all the conditionals
  return (
    <>
      <SearchForm value={searchTerm} changeHandler={searchHandler} />

      {searchTerm && countries.length === 1 ? (
        <SingleCountry
          countries={countries}
          searchHandler={searchHandler}
          searchTerm={searchTerm}
        />
      ) : null}

      {searchTerm && countries.length > 1 && countries.length < 10 ? (
        <MultipleCountries
          countries={countries}
          searchHandler={searchHandler}
          searchTerm={searchTerm}
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

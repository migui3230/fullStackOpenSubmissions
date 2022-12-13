import { useState, useEffect } from "react";
import axios from "axios";

const SinglePersonData = ({ id, name, number }) => {
  return (
    <>
      <p key={id}>
        {name} {number}
      </p>
    </>
  );
};

const RenderData = ({ displayData }) => {
  return (
    <>
      <h2>Numbers</h2>
      {displayData.map((data) => (
        <SinglePersonData id={data.id} name={data.name} number={data.number} />
      ))}
    </>
  );
};

const AddNewData = ({
  submitHandler,
  nameValue,
  numberValue,
  nameHandler,
  numberHandler,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={nameValue} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={numberValue} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Filter = ({ data, changeHandler }) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={changeHandler} value={data} />
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredData = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const renderData = filteredData.length > 0 ? filteredData : persons;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameAlreadyExists = persons.find((person) => person.name === newName);
    if (nameAlreadyExists) {
      window.alert(`${newName} already exists in the phonebook.`);
      return;
    }
    e.target.value = "";
    setPersons(
      persons.concat({
        name: newName,
        number: number,
      })
    );
    setNumber("");
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter data={filter} changeHandler={handleFilterChange} />
      <AddNewData
        nameHandler={handleNameChange}
        nameValue={newName}
        numberHandler={handleNumberChange}
        numberValue={number}
        submitHandler={handleSubmit}
      />
      <RenderData displayData={renderData} />
    </>
  );
};

export default App;

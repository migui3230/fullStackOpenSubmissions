import { useState, useEffect } from "react";
import databaseService from "./services/databaseService";

const SinglePersonData = ({ id, name, number }) => {
  return (
    <>
      <p key={id}>
        {name} {number}
      </p>
    </>
  );
};

const RenderData = ({ displayData, persons, setPersons }) => {
  const handleDeleteButton = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);
    const removePerson = persons.find((p) => p.name === name);
    const newPersonsArray = persons.filter((person) => person !== removePerson);

    if (result) {
      databaseService.deletePerson(id);
      setPersons(newPersonsArray);
    }
  };

  return (
    <>
      <h2>Numbers</h2>
      {displayData.map((data) => (
        <>
          <SinglePersonData
            id={data.id}
            name={data.name}
            number={data.number}
          />
          <button onClick={() => handleDeleteButton(data.id, data.name)}>
            delete
          </button>
        </>
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
  // console.log(persons);

  useEffect(() => {
    databaseService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.error(error);
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

    const personAlreadyExists = persons.find(
      (person) => person.name === newName
    );

    const newPerson = {
      name: newName,
      number: number,
      id: persons[persons.length - 1].id + 1,
    };

    if (personAlreadyExists) {
      const result = window.confirm(
        `${personAlreadyExists.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        const updatedPerson = { ...personAlreadyExists, number: number };

        // create the put request here with the person id and this new updatedPerson object
        databaseService.updatePerson(personAlreadyExists.id, updatedPerson);

        // set state for the new persons array
        const newArray = persons.map((person) =>
          person.name === updatedPerson.name ? updatedPerson : person
        );

        setPersons(newArray);

        return;
      } else {
        return;
      }
    }
    e.target.value = "";

    databaseService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(newPerson));
      })
      .catch((error) => {
        console.error(error);
      });

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
      <RenderData
        displayData={renderData}
        persons={persons}
        setPersons={setPersons}
      />
    </>
  );
};

export default App;

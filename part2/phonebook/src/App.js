import { useState, useEffect } from "react";
import databaseService from "./services/databaseService";
import "./index.css";
import RenderData from "./components/RenderData";
import AddNewData from "./components/AddNewData";

const AddedPerson = ({ name, updatingNumber }) => {
  // TODO: change this component to "updated {name}" when im updating a name with a new number, use a ternary operator here?\
  if (updatingNumber) {
    return <div className="added">Updated {name}</div>;
  }
  return <div className="added">Added {name} </div>;
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
  const [showAddedPerson, setShowAddedPerson] = useState(false);
  const [addedName, setAddedName] = useState("");
  // should i use another state hook to show the "updated" text instead of being added? is there something better for this
  const [updatingNumber, setUpdatingNumber] = useState(false);

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

        setAddedName(newName);
        setUpdatingNumber(true);

        setShowAddedPerson(true);
        setTimeout(() => {
          setShowAddedPerson(false);
          setAddedName("");
          setUpdatingNumber(false);
        }, 3000);

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
    setAddedName(newName);

    setShowAddedPerson(true);
    setTimeout(() => {
      setShowAddedPerson(false);
      setAddedName("");
    }, 3000);
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

  // TODO: do this part for the updated name too
  return (
    <>
      <h2>Phonebook</h2>
      {showAddedPerson && (
        <AddedPerson name={addedName} updatingNumber={updatingNumber} />
      )}
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

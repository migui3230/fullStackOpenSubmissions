import { useState, useEffect } from "react";
import databaseService from "./services/databaseService";
import "./index.css";
import RenderData from "./components/RenderData";
import AddNewData from "./components/AddNewData";
import DeletedPerson from "./components/DeletedPerson";

const AddedPerson = ({ name, updatingNumber }) => {
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
  const [updatingNumber, setUpdatingNumber] = useState(false);
  const [showDeletedPerson, setShowDeletedPerson] = useState(false);
  const [deletedPerson, setDeletedPerson] = useState("");
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const personAlreadyExists = persons.find(
        (person) => person.name === newName
      );

      const newPerson = {
        name: newName,
        number: number,
        id: null,
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
          await databaseService
            .updatePerson(personAlreadyExists._id, updatedPerson)
            .then(console.log("success"))
            .catch((error) => {
              setError(error);

              setTimeout(() => {
                setError(null);
              }, 3000);
            });

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
      await databaseService.create(newPerson).then((data) => {
        newPerson.id = data._id;
        setPersons(persons.concat(newPerson));
      });

      setNumber("");
      setNewName("");
    } catch (error) {
      setError(error);

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      {/* <DeletedPerson name="test" /> */}
      {error ? <p className="deleted"> {error.message} </p> : null}
      {showDeletedPerson && <DeletedPerson name={deletedPerson} />}
      {showAddedPerson && !error && (
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
        setDeletedPerson={setDeletedPerson}
        setShowDeletedPerson={setShowDeletedPerson}
      />
    </>
  );
};

export default App;

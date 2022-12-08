import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // TODO: create an alert that takes in the newName state and displays a message if the newName is already in the persons array
  // TODO: do validation for checking if the current newName variable is already in the persons array

  const handleNameChange = (e) => {
    setNewName(e.target.value);
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
      })
    );
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p>{person.name}</p>
      ))}
      <p>debug: {newName}</p>
    </>
  );
};

export default App;

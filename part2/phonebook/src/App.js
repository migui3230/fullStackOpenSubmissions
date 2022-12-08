import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

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
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p>
          {person.name} {person.number}
        </p>
      ))}
      <p>debug: {newName}</p>
    </>
  );
};

export default App;

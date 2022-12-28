import databaseService from "./../services/databaseService";
import SinglePersonData from "./SinglePersonData";

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

export default RenderData;

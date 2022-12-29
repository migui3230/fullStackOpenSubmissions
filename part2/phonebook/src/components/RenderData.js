import databaseService from "./../services/databaseService";
import SinglePersonData from "./SinglePersonData";

// TODO: do a catch block here to render the error block using another state hook?
// TODO: return if we hit the catch block
// TODO: remember to clear the most recently deleted person once you make the component disappear
const RenderData = ({
  displayData,
  persons,
  setPersons,
  setDeletedPerson,
  setShowDeletedPerson,
}) => {
  const handleDeleteButton = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);
    const removePerson = persons.find((p) => p.name === name);
    const newPersonsArray = persons.filter((person) => person !== removePerson);

    if (result) {
      databaseService.deletePerson(id).catch((error) => {
        setDeletedPerson(name);
        setShowDeletedPerson(true);
        setTimeout(() => {
          setShowDeletedPerson(false);
          setDeletedPerson("");
        }, 3000);
      });
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

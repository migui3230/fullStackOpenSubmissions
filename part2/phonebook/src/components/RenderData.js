import databaseService from "./../services/databaseService";
import SinglePersonData from "./SinglePersonData";

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
            id={data._id}
            name={data.name}
            number={data.number}
          />
          <button onClick={() => handleDeleteButton(data._id, data.name)}>
            delete
          </button>
        </>
      ))}
    </>
  );
};

export default RenderData;

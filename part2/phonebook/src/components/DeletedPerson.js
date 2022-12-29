const DeletedPerson = ({ name }) => {
  return (
    <div className="deleted">
      Information of {name} has already been removed from server
    </div>
  );
};

export default DeletedPerson;

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

export default AddNewData;

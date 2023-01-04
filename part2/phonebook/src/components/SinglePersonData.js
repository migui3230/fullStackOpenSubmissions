const SinglePersonData = ({ id, name, number }) => {
  return (
    <>
      <p key={id}>
        {id} {name} {number}
      </p>
    </>
  );
};

export default SinglePersonData;

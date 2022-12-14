import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const deleteUrl = baseUrl + "/" + id;
  const request = axios.delete(deleteUrl);
  return request.then((response) => response.data);
};

const updatePerson = (id, newObject) => {
  const putUrl = baseUrl + "/" + id;
  const request = axios.put(putUrl, newObject);
  return request.then((response) => response.data);
};

export default { updatePerson, getAll, create, deletePerson };

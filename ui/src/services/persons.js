import axios from "axios";

const baseUrl = "https://stark-ridge-32063.herokuapp.com/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios
    .post(baseUrl, newObject)
    .then((response) => response.data);
  return request;
};

const remove = (id) => {
  let request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const update = (person) => {
  let request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  update,
};
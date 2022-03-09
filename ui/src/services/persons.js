import axios from "axios";

let baseUrl;

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://stark-ridge-32063.herokuapp.com/api/persons";
}
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3001/api/persons";
}

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

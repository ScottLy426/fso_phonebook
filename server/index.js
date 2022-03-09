const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.static("build"));
app.use(express.json());

app.use(cors());

morgan.token("content", (req, res) => {
  let string = JSON.stringify(res.req.body);
  return string;
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const ids = phonebook.map((person) => person.id);
  let maxId = Math.max(...ids);
  return ++maxId;
};

app.get("/api/persons", (request, response) => {
  const body = request.body;
  response.send(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
  }
  response.send(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const alreadyExists = phonebook.find((person) => person.id === body.id);
  if (!(body.number && body.name)) {
    response.status(404).send({ error: "missing number and/or name" });
  }

  if (alreadyExists) {
    response.status(404).send({ error: "name already exists" });
  }

  const newObject = {
    ...body,
    id: generateId(),
  };

  phonebook = phonebook.concat(newObject);
  response.status(200).send(phonebook);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const exists = phonebook.find((person) => person.id === id);
  if (!exists) {
    response.status(404).end();
  } else {
    phonebook = phonebook.filter((person) => {
      return person.id !== id;
    });
    response.status(204).end();
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

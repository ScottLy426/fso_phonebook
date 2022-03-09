import { useEffect, useState } from "react";

import Form from "./components/form";
import Search from "./components/search";
import Persons from "./components/persons";
import Notification from "./components/notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    let isNewName = persons.find((person) => newName === person.name);
    const changedPerson = { ...isNewName, number: newNumber };

    if (isNewName) {
      let result = window.confirm(
        `${isNewName.name} already in phone book, replace number?`
      );
      if (result) {
        personService.update(changedPerson).catch((error) => {
          setError("updateFailed");
          setTimeout(() => {
            setError(false);
            setNewName("");
            setNewNumber("");
            setSearch("");
          }, 1000);
          return;
        });

        let addPerson = persons.map((person) =>
          person.id === isNewName.id ? changedPerson : person
        );

        setPersons(addPerson);
        setError("update");
        setTimeout(() => {
          setError(false);
          setNewName("");
          setNewNumber("");
          setSearch("");
        }, 1000);

        return;
      }
      setNewName("");
      setNewNumber("");
      setSearch("");
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newObject)
      .then((response) => setPersons(persons.concat(response)));

    setError("update");
    setTimeout(() => {
      setError(false);
      setNewName("");
      setNewNumber("");
      setSearch("");
    }, 1000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRemove = (id) => {
    personService.remove(id).catch((error) => {
      setError("removeError");
      setTimeout(() => {
        setError(false);
      }, 1000);
    });
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {error ? <Notification error={error} newName={newName} /> : null}
      <Search handleSearch={handleSearch} search={search} />
      <h2>Add a new</h2>
      <Form
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;

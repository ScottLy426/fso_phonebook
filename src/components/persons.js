const Persons = ({ filteredPersons, handleRemove }) => {
  return (
    <ul>
      {filteredPersons.map((person, idx) => {
        return (
          <li key={idx}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleRemove(person.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;

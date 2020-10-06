import React, { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ persons }) => {
  return persons.map(person => <Person key={person.name} person={person} />);
};

const Filter = ({ onChange, value }) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={onChange} value={value} />
      </div>
    </form>
  );
};

const PersonForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameInput} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("response succesfull");
      setPersons(response.data);
    });
  }, []);

  const handleNameInput = event => {
    setNewName(event.target.value);
  };

  const handleNumberInput = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = event => {
    setFilterValue(event.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const addToPhonebook = event => {
    event.preventDefault();
    const names = persons.map(person => person.name.toLowerCase());
    console.log(names);
    let isExists = names.includes(newName.toLowerCase());
    if (!isExists) {
      const newObj = { name: newName, number: newNumber };
      setPersons(persons.concat(newObj));
      setNewName("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    }
  };

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterInput} value={filterValue} />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addToPhonebook}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

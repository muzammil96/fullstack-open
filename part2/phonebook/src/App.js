import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./App.css";

const Person = ({ person, onClick }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={onClick}>Delete</button>
    </div>
  );
};

const Persons = ({ persons, onClick }) => {
  return persons.map(person => (
    <Person
      key={person.name}
      person={person}
      onClick={() => onClick(person.id)}
    />
  ));
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
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
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(personsdata => {
      console.log("response succesfull");
      setPersons(personsdata);
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

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`${personToDelete.name} will be deleted`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)));
    }
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
      personService.create(newObj).then(newperson => {
        setPersons(persons.concat(newperson));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`Note '${newName}' was added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          person => person.name.toLowerCase() === newName.toLowerCase()
        );
        const newPers = {
          name: personToUpdate.name,
          number: newNumber
        };
        personService
          .update(personToUpdate.id, newPers)
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setErrorMessage(`Note '${personToUpdate.name}' was updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch(error => {
            setPersons(
              persons.filter(person => person.id !== personToUpdate.id)
            );
            setErrorMessage(
              `Note '${personToUpdate.name}' has been removed from server.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }

      setNewName("");
      setNewNumber("");
    }
  };

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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

      <Persons persons={filteredPersons} onClick={deletePerson} />
    </div>
  );
};

export default App;

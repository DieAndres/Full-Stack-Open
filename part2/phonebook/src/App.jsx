import { useState, useEffect } from 'react';
import personsService from './service/persons'
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const FormPerson = ({ addPerson, newName, handleNameChange, handleNumberChange, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <ul>
      {persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => onDeletePerson(person)}>Delete</button></li>)}
    </ul>
  );
};

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  const msgtipe = error ? 'error' : 'confirmed'
  return (
    <div className={msgtipe}>
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ text: null, error: null });

  useEffect(() => {
    personsService.getAll()
      .then(iniPersons => {
        setPersons(iniPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (!exists) {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personsService.create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setMessage({ text: `Added ${person.name}`, error: false })
          setTimeout(() => {
            setMessage({ text: null, error: false })
          }, 5000)
        })
        .catch((error) => {
          console.log(error.response.data.error)
          setMessage({ text: error.response.data.error, error: true })
          setTimeout(() => {
            setMessage({ text: null, error: true })
          }, 5000)
        })
      setNewName('');
      setNewNumber('');
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updateNumber = { ...exists, number: newNumber }
        personsService.update(exists.id, updateNumber)
          .then(person => {
            let personsNew = persons.filter(p => p.id !== person.id)
            setPersons(personsNew.concat(person))
            setMessage({ text: `Modified number ${person.number}`, error: false })
            setTimeout(() => {
              setMessage({ text: null, error: false })
            }, 5000)
          })
          .catch(() => {
            setMessage({ text: `Error when modifying the number ${newNumber}`, error: true })
            setTimeout(() => {
              setMessage({ text: null, error: true })
            }, 5000)
          })
      }
    }
  };

  const onDeletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage({ text: `${person.name} was eliminated`, error: false })
          setTimeout(() => {
            setMessage({ text: null, error: false })
          }, 5000)
        })
        .catch(() => {
          setMessage({ text: `Error delete person: ${person.name}`, error: true })
          setTimeout(() => {
            setMessage({ text: null, error: true })
          }, 5000)
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} error={message.error}></Notification>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h4>add a new</h4>
      <FormPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={onDeletePerson} />
    </div>
  );
};

export default App;
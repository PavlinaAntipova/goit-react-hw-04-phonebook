import React, { useState, useEffect } from 'react';

import FormContacts from '../components/FormContacts';
import Filter from '../components/Filter';
import ContactList from '../components/ContactsList';

import s from './App.module.css';


export default function App() {

  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem("contacts")) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const updateState = newContact => {
    setContacts(prevState => {
      return [...prevState, newContact]
    });
  }

  const filterContacts = () => {
    const normalizeName = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeName),
    );
    return filteredContacts;
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };


  return (
      <div className={s.AppContainer}>
        <h1 className={s.title}>My Contacts</h1>
        <FormContacts
          updateState={updateState}
          contacts={contacts}
        />
        <Filter value={filter} onChange={e => {setFilter(e.target.value)}} />
        <ContactList
          contacts={filterContacts()}
          deleteFunc={deleteContact}
        />
      </div>
    );
};
 



import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import s from './FormContacts.module.css';

export default function FormContacts({ updateState, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
          setName('');
          setNumber('');
  }

  const checkingExistContact = contacts.find(contact => contact.name === name);
  return (
    
      <form
      className={s.Form}
      onSubmit={e => {
        e.preventDefault();
        if (checkingExistContact) {
          alert(`${name} is already in the contacts!`);
          reset();
          return;
        }
        updateState({ id: nanoid(), name, number });
        reset();
      }}
      >
        <label className={s.name}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="name goes here"
            required
            value={name}
            onChange={e => {setName( e.target.value)}}
          />
        </label>
        <label className={s.phone}>
          Phone
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="number goes here"
            required
            value={number}
            onChange={e => {setNumber( e.target.value)}}
          />
        </label>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </form>
    );
}


FormContacts.propTypes = {
  updateState: PropTypes.func,
  contacts: PropTypes.array
}
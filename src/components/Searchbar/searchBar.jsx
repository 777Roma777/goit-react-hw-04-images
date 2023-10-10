import React from 'react';
import css from './searchbar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);

  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);

  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>
      </form>
    </header>
  );
};
export default SearchBar;

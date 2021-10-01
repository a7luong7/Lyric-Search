/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from '../../types';
import { searchLyrics } from '../../external-api';

const SearchForm = ({ setSongResults } : {
  setSongResults: (songs:Song[]) => void
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchText) { return; }
    const lyricsSearchRes = await searchLyrics(searchText);
    setSongResults(lyricsSearchRes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        disabled={!searchText}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from '../../types';
import { searchSongs } from '../../external-api';

const SearchForm = ({ searchTerm, setSearchTerm, setSongResults } : {
  searchTerm: string,
  setSearchTerm: (st:string) => void,
  setSongResults: (songs:Song[]) => void
}) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchTerm) { return; }
    const lyricsSearchRes = await searchSongs(searchTerm);
    setSongResults(lyricsSearchRes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        disabled={!searchTerm}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { Song } from '../../types';
import { searchSongs } from '../../external-api';
import SongsContext from '../../contexts';

const SearchForm = ({ searchTerm, setSearchTerm, setSongResults } : {
  searchTerm: string,
  setSearchTerm: (st:string) => void,
  setSongResults: (songs:Song[]) => void
}) => {
  const [songsState, dispatch] = useContext(SongsContext);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchTerm) { return; }

    const query = searchTerm;
    const lyricsSearchRes = await searchSongs(searchTerm);
    // setSongResults(lyricsSearchRes.songs || []);
    dispatch({
      type: 'SET_SONGS',
      data: {
        songs: lyricsSearchRes.songs,
        query,
        nextPage: lyricsSearchRes.nextPage,
      },
    });
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

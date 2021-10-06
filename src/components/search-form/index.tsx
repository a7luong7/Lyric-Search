/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { Song } from '../../types';
import { searchSongs } from '../../external-api';
import SongsContext from '../../contexts';

const SearchForm = ({ searchTerm, setSearchTerm } : {
  searchTerm: string,
  setSearchTerm: (st:string) => void,
}) => {
  const [songsState, dispatch] = useContext(SongsContext);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchTerm) { return; }

    dispatch({ type: 'SET_LOADING' });
    const query = searchTerm;

    try {
      const lyricsSearchRes = await searchSongs(searchTerm, 1);
      dispatch({
        type: 'SET_SONGS',
        data: {
          songs: lyricsSearchRes.songs,
          query,
          nextPage: lyricsSearchRes.nextPage,
        },
      });
    } catch (ex:any) {
      dispatch({
        type: 'SET_ERROR',
        data: ex.message as string,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        disabled={!searchTerm || songsState.isLoading}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { Song } from '../../types';
import { searchSongs } from '../../external-api';
import SongsContext from '../../contexts';
import { Icon } from '../icon';
import * as S from './styles';

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
    <S.Form onSubmit={handleSubmit}>
      <S.Button
        disabled={!searchTerm || songsState.isLoading}
        type="submit"
      >
        <Icon icon="search" />
      </S.Button>
      <S.Input
        type="text"
        value={searchTerm}
        placeholder="Search by lyrics here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </S.Form>
  );
};

export default SearchForm;

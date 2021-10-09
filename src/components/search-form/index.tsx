/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { Song } from '../../types';
import { searchSongs } from '../../external-api';
import SongsContext from '../../contexts';
import { Icon, IconWithLoad } from '../icon';
import * as S from './styles';

const SearchForm = ({ searchTerm, setSearchTerm } : {
  searchTerm: string,
  setSearchTerm: (st:string) => void,
}) => {
  const [songsState, dispatch] = useContext(SongsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchTerm) { return; }

    dispatch({ type: 'SET_LOADING' });
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (ex:any) {
      dispatch({
        type: 'SET_ERROR',
        data: ex.message as string,
      });
      setIsLoading(false);
    }
  };
  const isDisabled = !searchTerm || songsState.isLoading;
  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Button
        disabled={isDisabled}
        type="submit"
      >
        <IconWithLoad icon="search" isLoading={isLoading} color={isDisabled ? '#ccc' : '#888'} />

      </S.Button>
      <S.Input
        type="text"
        value={searchTerm}
        placeholder="born in a crossfire hurricane"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </S.Form>
  );
};

export default SearchForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from '../../types';
import { searchLyrics } from '../../external-api';
import * as S from './styles';

const SongItem = ({ song, handleClick } : {
  song: Song,
  handleClick: () =>void
}) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (song.song_art_image_thumbnail_url) {
      setImgUrl(song.song_art_image_thumbnail_url);
    } else if (song.header_image_thumbnail_url) {
      setImgUrl(song.header_image_thumbnail_url);
    }
  }, []);

  const imgStyle = {
    maxHeight: '100px',
    maxWidth: '100px',
    width: '100px',
    minHeight: '100px',
    border: 'solid gray 1px',
  };
  return (
    <S.SongItem
      onClick={handleClick}
      onKeyDown={handleClick}
      role="menuitem"
      tabIndex={0}
      style={{ marginBottom: '.5rem' }}
    >
      <S.SongItemImgWrapper>
        {imgUrl
          ? <S.SongItemImg src={imgUrl} alt="Album art" />
          : <div>Loading...</div>}
      </S.SongItemImgWrapper>
      <div>
        <S.SongTitle>{song.title}</S.SongTitle>
        <S.SongArtist>{song.artist}</S.SongArtist>
      </div>
    </S.SongItem>
  );
};

const SongList = ({ songs, setCurrentSong }: {
  songs: Song[],
  setCurrentSong: (song:Song) => void
}) => {
  const placeholders = [];
  if (songs.length === 0) { return (<div>No songs found</div>); }

  return (
    <div>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          handleClick={() => setCurrentSong(song)}
        />
      ))}
    </div>
  );
};

export default SongList;

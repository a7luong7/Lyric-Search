/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from '../../types';
import { searchLyrics } from '../../external-api';

const SongItem = ({ song }: { song: Song }) => {
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
    <div style={{ marginBottom: '.5rem' }}>
      <div style={imgStyle}>
        {imgUrl
          ? <img style={imgStyle} src={imgUrl} alt="Album art" />
          : <div>Loading...</div>}
      </div>
      <div>{song.title}</div>
      <div>
        by
        {' '}
        {song.artist}
      </div>
    </div>
  );
};

const SongList = ({ songs }: { songs: Song[] }) => {
  const placeholders = [];
  if (songs.length === 0) { return (<div>No songs found</div>); }

  return (
    <div>
      {songs.map((song) => <SongItem key={song.id} song={song} />)}
    </div>
  );
};

export default SongList;

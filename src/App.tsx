/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from './types';
import { searchLyrics } from './external-api';

const SearchForm = ({ setSongResults }: { setSongResults: any }) => {
  const [searchText, setSearchText] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!searchText) { return; }

    const lyricsSearchRes = await searchLyrics(searchText);
    // console.log('lyrics result', lyricsSearchRes);

    // const uniqueTracks = lyricsSearchRes.reduce((res: any[], item:any) => {
    //   const isDuplicate = res.some((x) => x.album_name === item.album_name
    //     && x.artist_name === item.artist_name);
    //   if (isDuplicate) { return res; }
    //   return res.concat(item);
    // }, []);

    // console.log('unique tracks', uniqueTracks);
    setSongResults(lyricsSearchRes);
    // setSongResults(lyricsSearchRes.track_list);
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

const SearchResults = ({ songs }: { songs: Song[] }) => {
  const placeholders = [];
  if (songs.length === 0) { return (<div>No songs found</div>); }

  return (
    <div>
      {songs.map((song) => <SongItem key={song.id} song={song} />)}
    </div>
  );
};

const SongItem = ({ song }: { song: Song }) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (song.song_art_image_thumbnail_url) {
      setImgUrl(song.song_art_image_thumbnail_url);
    } else if (song.header_image_thumbnail_url) {
      setImgUrl(song.header_image_thumbnail_url);
    }
  }, []);

  // useEffect(() => {
  //   async function getAlbum() {
  //     const album = await searchAlbums(track.album_name, track.artist_name);
  //     console.log('albums', album);

  //     if (Object.keys(album).length === 0
  //     || !album.album_coverart) { return; }

  //     setImgUrl(album.album_coverart);
  //   }
  //   getAlbum();
  // }, []);

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

const App = () => {
  const [songResults, setSongResults] = useState<Song[]>([]);
  return (
    <div className="App">
      <SearchForm setSongResults={setSongResults} />
      <SearchResults songs={songResults} />
    </div>
  );
};

export default App;

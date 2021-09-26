import React, { useEffect, useState } from 'react';
import './App.css';
import { searchLyrics, searchAlbums, searchAlbumArt } from './external-api';

const SearchForm = ({ setSongResults }: { setSongResults: any }) => {
  const [searchText, setSearchText] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!searchText) { return; }

    console.log(searchText);

    const lyricsSearchRes = searchLyrics(searchText);
    console.log('lyrics result', lyricsSearchRes);

    const uniqueTracks = lyricsSearchRes.track_list.reduce((res: any[], item:any) => {
      const isDuplicate = res.some((x) => x.album_name === item.track.album_name
        && x.artist_name === item.track.artist_name);
      if (isDuplicate) { return res; }
      return res.concat(item.track);
    }, []);

    console.log('unique tracks', uniqueTracks);
    setSongResults(uniqueTracks);
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

const SearchResults = ({ songResults }: { songResults: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const placeholders = [];
  if (songResults.length === 0) { return (<div>No songs found</div>); }

  // const searchAlbumsCall = async () => {
  //   const
  // };

  return (
    <div>
      {songResults.map((track: any) => <Song key={track.track_id} track={track} />)}
    </div>
  );
};

const Song = ({ track }: { track: any }) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    async function getAlbum() {
      const albums = await searchAlbums(track.album_name, track.artist_name);
      if (albums.count === 0) { return; }
      const albumID = albums.releases[0].id;
      console.log('album id', albumID);
      const albumArts = await searchAlbumArt(albumID);
      if (!albumArts || albumArts.images.length === 0) { return; }
      console.log('almbum arts', albumArts.images);

      setImgUrl(albumArts.images[0].thumbnails.small);
    }
    getAlbum();
  }, []);

  const imgStyle = {
    maxHeight: '100px',
    maxWidth: '100px',
    width: '100px',
    minHeight: '100px',
    border: 'solid gray 1px',
  };
  return (
    <div key={track.track_id} style={{ marginBottom: '.5rem' }}>
      <div style={imgStyle}>
        {imgUrl
          ? <img style={imgStyle} src={imgUrl} alt="Album art" />
          : <div>Loading...</div>}
      </div>
      <div>{track.track_name}</div>
      <div>
        {track.artist_name}
        {' '}
        -
        {' '}
        {track.album_name}
      </div>
    </div>
  );
};

const App = () => {
  const [songResults, setSongResults] = useState([]);
  console.log('api key', process.env.REACT_APP_MUSIXMATCH_API_KEY);
  return (
    <div className="App">
      <SearchForm setSongResults={setSongResults} />
      <SearchResults songResults={songResults} />
    </div>
  );
};

export default App;
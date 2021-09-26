import React, { useState } from 'react';
import './App.css';
import { searchLyrics } from './musix-match';

const SearchForm = ({ setSongResults } : { setSongResults:any }) => {
  const [searchText, setSearchText] = useState('');
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!searchText) { return; }

    console.log(searchText);

    const lyricsSearchRes = searchLyrics(searchText);
    console.log('lyrics result', lyricsSearchRes);
    setSongResults(lyricsSearchRes.track_list);
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

const SearchResults = ({ songResults } : { songResults:any }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const placeholders = [];
  if (songResults.length === 0) { return (<div>No songs found</div>); }

  return (
    <div>
      {songResults.map(({ track } : any) => (
        <div key={track.track_id} style={{ marginBottom: '.5rem' }}>
          <div>{track.track_name}</div>
          <div>
            {track.artist_name}
            {' '}
            -
            {' '}
            {track.album_name}
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [songResults, setSongResults] = useState([]);
  return (
    <div className="App">
      <SearchForm setSongResults={setSongResults} />
      <SearchResults songResults={songResults} />
    </div>
  );
};

export default App;

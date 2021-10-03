/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Song } from './types';
import { SearchForm, SongList, SongView } from './components';

const style = {
  display: 'flex',
};
const flexItemStyle = {
  width: '50%',
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songResults, setSongResults] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <div className="App" style={style}>
      <div style={flexItemStyle}>
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSongResults={setSongResults}
        />
        <SongList
          songs={songResults}
          setCurrentSong={setCurrentSong}
        />
      </div>
      {currentSong && <SongView song={currentSong} searchTerm={searchTerm} />}
    </div>
  );
};

export default App;

/* eslint-disable linebreak-style */
import React, { useState, useReducer } from 'react';
import { Song } from './types';
import { SearchForm, SongList, SongView } from './components';
import SongsContext from './contexts';
import { reducer, initialState } from './reducers';

const style = {
  display: 'flex',
};
const flexItemStyle = {
  width: '50%',
};

const App = () => {
  const [songState, dispatch] = useReducer(reducer, initialState);

  const [searchTerm, setSearchTerm] = useState('');
  const [songResults, setSongResults] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <SongsContext.Provider value={[songState, dispatch]}>
      <div className="App" style={style}>
        <div style={flexItemStyle}>
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSongResults={setSongResults}
          />
          <SongList />
        </div>
        {currentSong && <SongView song={currentSong} searchTerm={searchTerm} />}
      </div>
    </SongsContext.Provider>
  );
};

export default App;

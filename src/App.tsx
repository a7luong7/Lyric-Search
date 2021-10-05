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

  return (
    <SongsContext.Provider value={[songState, dispatch]}>
      <div className="App" style={style}>
        <div style={flexItemStyle}>
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <SongList />
        </div>
        {songState.currentSong && <SongView song={songState.currentSong} searchTerm={searchTerm} />}
      </div>
    </SongsContext.Provider>
  );
};

export default App;

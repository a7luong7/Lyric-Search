/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Song } from './types';
import { SearchForm, SongList } from './components';

const App = () => {
  const [songResults, setSongResults] = useState<Song[]>([]);
  return (
    <div className="App">
      <SearchForm setSongResults={setSongResults} />
      <SongList songs={songResults} />
    </div>
  );
};

export default App;

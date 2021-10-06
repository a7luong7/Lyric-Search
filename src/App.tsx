/* eslint-disable linebreak-style */
import React, { useState, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import { SearchForm, SongList, SongView } from './components';
import SongsContext from './contexts';
import { reducer, initialState } from './reducers';

const Error = ({ errorMessage } : { errorMessage:string }) => {
  if (!errorMessage) return null;
  const errorStyle = {
    display: 'block',
    backgroundColor: '#F56565',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '.25rem',
  };
  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  );
};

const SongSearch = ({ searchTerm, setSearchTerm } : {
  searchTerm:string,
  setSearchTerm:React.Dispatch<any>
}) => (
  <div>
    <SearchForm
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
    <SongList />
  </div>
);

const App = () => {
  const [songState, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SongsContext.Provider value={[songState, dispatch]}>
      <div className="App">
        {songState.error && <Error errorMessage={songState.error} />}

        <Router>
          <Switch>
            <Route path="/song">
              {songState.currentSong
                ? <SongView song={songState.currentSong} searchTerm={searchTerm} />
                : <SongSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> }
            </Route>
            <Route path="/">
              <SongSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Route>
          </Switch>
        </Router>

      </div>
    </SongsContext.Provider>
  );
};

export default App;

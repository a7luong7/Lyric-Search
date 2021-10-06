import { SongsAction, SongsState } from '../types';

const initialState : SongsState = {
  songs: [],
  currentSong: null,
  query: '',
  nextPage: 1,
  isLoading: false,
  error: null,
};

const reducer = (state:SongsState, action:SongsAction) : SongsState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.data };
    case 'APPEND_SONGS':
      return {
        ...state,
        songs: state.songs.concat(action.data.songs),
        nextPage: action.data.nextPage,
        isLoading: false,
        error: null,
      };
    case 'SET_SONGS':
      return {
        ...state,
        songs: action.data.songs,
        query: action.data.query,
        nextPage: action.data.nextPage,
        isLoading: false,
        error: null,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: state.songs.find((x) => x.id === action.data) || null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.data };
    default:
      return state;
  }
};

export {
  reducer,
  initialState,
};

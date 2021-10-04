import { SongsAction, SongsState } from '../types';

const initialState : SongsState = {
  songs: [],
  currentSong: null,
  query: '',
  nextPage: 1,
  isLoading: false,
  isError: false,
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
        isError: false,
      };
    case 'SET_SONGS':
      return {
        ...state,
        songs: action.data.songs,
        query: action.data.query,
        nextPage: action.data.nextPage,
        isLoading: false,
        isError: false,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: state.songs.find((x) => x.id === action.data) || null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: true, isError: false };
    case 'SET_ERROR':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export {
  reducer,
  initialState,
};

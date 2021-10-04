import React, { createContext } from 'react';
import { SongsState, SongsAction } from '../types';
import { initialState } from '../reducers';

type SongsContextValue = [
    songsState:SongsState,
    dispatch: React.Dispatch<SongsAction>,
];

const initialDispatch = () => {};

const SongsContext = createContext<SongsContextValue>([initialState, initialDispatch]);

export default SongsContext;

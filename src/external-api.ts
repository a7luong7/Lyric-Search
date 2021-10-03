import axios from 'axios';
import { Song, SongSearchResponse, LyricsRes } from './types';

const baseUrl = 'http://localhost:3001/api';

export const searchSongs = (lyrics: string) : Promise<SongSearchResponse> => {
  const page = 1;
  const url = `${baseUrl}/search?lyrics=${encodeURI(lyrics)}`;
  return axios.get(url).then((res) => res.data);
};

export const searchLyrics = (path: string) : Promise<LyricsRes> => {
  const url = `${baseUrl}/lyrics?path=${path}`;
  console.log(url);
  return axios.get(url).then((res) => res.data);
};

export default {};

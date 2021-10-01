import axios from 'axios';
import { Song } from './types';

const baseUrl = 'http://localhost:3001/api';

export const searchLyrics = (lyrics: string) : Promise<Song[]> => {
  const page = 1;
  const url = `${baseUrl}/search?lyrics=${encodeURI(lyrics)}`;
  return axios.get(url).then((res) => res.data);
};

export default {};

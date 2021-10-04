import axios from 'axios';
import { Song, SongSearchResponse, LyricsRes } from './types';

const baseUrl = 'http://localhost:3001/api';

export const searchSongs = async (lyrics: string) : Promise<SongSearchResponse> => {
  const page = 1;
  const url = `${baseUrl}/search?lyrics=${encodeURI(lyrics)}`;
  const result = await axios.get(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result.data;
};

export const searchLyrics = (path: string) : Promise<LyricsRes> => {
  const url = `${baseUrl}/lyrics?path=${path}`;
  console.log(url);
  return axios.get(url).then((res) => res.data);
};

export default {};

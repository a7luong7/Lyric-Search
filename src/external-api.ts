import axios from 'axios';
import { YoutubeSearchResult, SongSearchResponse, LyricsRes } from './types';

const baseUrl = 'http://localhost:3001/api';

export const searchSongs = async (lyrics: string, page: number) : Promise<SongSearchResponse> => {
  const url = `${baseUrl}/search?lyrics=${encodeURI(lyrics)}&page=${page}`;
  const result = await axios.get(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result.data;
};

export const searchLyrics = async (path: string) : Promise<LyricsRes> => {
  const url = `${baseUrl}/lyrics?path=${path}`;
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(url);
  return axios.get(url).then((res) => res.data);
};

export const searchYoutubeVideos = async (queryString:string) : Promise<YoutubeSearchResult[]> => {
  const url = `${baseUrl}/videos?queryString=${encodeURI(queryString)}`;
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(url).then((res) => res.data);
};

export default {};

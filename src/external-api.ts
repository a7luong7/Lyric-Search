/* eslint-disable linebreak-style */

import axios from 'axios';
import { albumResults, albumArtResults } from './music-brainsz-response-dummy';

const baseUrl = 'http://localhost:3001/api';

export const searchLyrics = (lyrics: string) : any => {
  const page = 1;
  const url = `${baseUrl}/songs/search?lyrics=${encodeURI(lyrics)}`;
  return axios.get(url).then((res) => {
    const { data } = res;
    return res.data;
  });
};

export const searchAlbums = async (title:string, artist:string) => {
  const url = `${baseUrl}/albums/search?artist=${encodeURI(artist)}&albumTitle=${encodeURI(title)}`;
  console.log('album search url', url);
  return axios.get(url).then((res) => res.data);
};

// export const searchAlbumArt = async (albumID:string) => {
//   const url = `http://coverartarchive.org/release/${albumID}`;
//   return albumArtResults;
//   // return axios.get(url).then((res) => res.data);
// };

export default {};

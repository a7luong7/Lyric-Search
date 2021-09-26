import axios from 'axios';
import { albumResults, albumArtResults } from './music-brainsz-response-dummy';

/* eslint-disable linebreak-style */
export const searchLyrics = (lyrics: string) : any => {
  const page = 1;
  const apiKey = process.env.REACT_APP_MUSIXMATCH_API_KEY;
  const baseURL = 'https://api.musixmatch.com/ws/1.1/track.search';
  const url = `${baseURL}?page=${page}&apikey=${apiKey}&q_lyrics=${lyrics}`;
  const config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
  };
  console.log('music match url', url);
  // return axios.get(url).then((res) => {
  //   const { data } = res;
  //   return data.message.body;
  // });

  const dummyResponse = {
    message: {
      header: { status_code: 200, execute_time: 0.035959959030151, available: 10000 },
      body: {
        track_list: [{
          track: {
            track_id: 215920329,
            track_name: 'good 4 u',
            track_name_translation_list: [],
            track_rating: 100,
            commontrack_id: 126980016,
            instrumental: 0,
            explicit: 1,
            has_lyrics: 1,
            has_subtitles: 1,
            has_richsync: 1,
            num_favourite: 296,
            album_id: 44287242,
            album_name: 'SOUR',
            artist_id: 32153100,
            artist_name: 'Olivia Rodrigo',
            track_share_url: 'https://www.musixmatch.com//lyrics//Olivia-Rodrigo//good-4-u-1?utm_source=application&utm_campaign=api&utm_medium=',
            track_edit_url: 'https://www.musixmatch.com//lyrics//Olivia-Rodrigo//good-4-u-1//edit?utm_source=application&utm_campaign=api&utm_medium=',
            restricted: 0,
            updated_time: '2021-06-06T09:19:37Z',
            primary_genres: {
              music_genre_list: [{
                music_genre: {
                  music_genre_id: 34, music_genre_parent_id: 0, music_genre_name: 'Music', music_genre_name_extended: 'Music', music_genre_vanity: 'Music',
                },
              }],
            },
          },
        }, {
          track: {
            track_id: 222844271, track_name: 'Way 2 Sexy (feat. Future & Young Thug)', track_name_translation_list: [], track_rating: 98, commontrack_id: 132920938, instrumental: 0, explicit: 1, has_lyrics: 1, has_subtitles: 1, has_richsync: 1, num_favourite: 29, album_id: 46749165, album_name: 'Certified Lover Boy', artist_id: 50808368, artist_name: 'Drake feat. Future & Young Thug', track_share_url: 'https://www.musixmatch.com/lyrics/Drake-Future-Young-Thug/Way-2-Sexy-with-Future-Young-Thug?utm_source=application&utm_campaign=api&utm_medium=', track_edit_url: 'https://www.musixmatch.com/lyrics/Drake-Future-Young-Thug/Way-2-Sexy-with-Future-Young-Thug/edit?utm_source=application&utm_campaign=api&utm_medium=', restricted: 0, updated_time: '2021-09-12T19:32:35Z', primary_genres: { music_genre_list: [] },
          },
        }, {
          track: {
            track_id: 215784421,
            track_name: 'good 4 u',
            track_name_translation_list: [],
            track_rating: 97,
            commontrack_id: 126467052,
            instrumental: 0,
            explicit: 1,
            has_lyrics: 1,
            has_subtitles: 1,
            has_richsync: 1,
            num_favourite: 1109,
            album_id: 44252175,
            album_name: 'SOUR',
            artist_id: 32153100,
            artist_name: 'Olivia Rodrigo',
            track_share_url: 'https://www.musixmatch.com/lyrics/Olivia-Rodrigo/good-4-u?utm_source=application&utm_campaign=api&utm_medium=',
            track_edit_url: 'https://www.musixmatch.com/lyrics/Olivia-Rodrigo/good-4-u/edit?utm_source=application&utm_campaign=api&utm_medium=',
            restricted: 0,
            updated_time: '2021-08-09T14:31:59Z',
            primary_genres: {
              music_genre_list: [{
                music_genre: {
                  music_genre_id: 34, music_genre_parent_id: 0, music_genre_name: 'Music', music_genre_name_extended: 'Music', music_genre_vanity: 'Music',
                },
              }],
            },
          },
        }],
      },
    },
  };
  return dummyResponse.message.body;
};

export const searchAlbums = async (title:string, artist:string) => {
  const limit = 5;
  const primaryType = 'album';
  let baseUrl = 'https://musicbrainz.org/ws/2/release';
  baseUrl = `${baseUrl}?query=release:"${title}" AND artist:"${artist}" AND primarytype:"${primaryType}"&limit=${limit}`;

  console.log('album search url', baseUrl);
  // return albumResults;
  return axios.get(baseUrl).then((res) => res.data);
};

export const searchAlbumArt = async (albumID:string) => {
  const url = `http://coverartarchive.org/release/${albumID}`;
  // return albumArtResults;
  return axios.get(url).then((res) => res.data);
};

export default {};
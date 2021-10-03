/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song } from '../../types';
import { searchLyrics } from '../../external-api';
import * as S from './styles';

const SongInfo = ({ song } : { song:Song }) => {
  const imgStyle = {
    maxHeight: '300px',
    maxWidth: '300px',
    width: '300px',
    minHeight: '300px',
    border: 'solid gray 1px',
  };
  return (
    <div>
      <h2>{song.title}</h2>
      <h4>
        by
        {' '}
        {song.artist}
      </h4>
      <img
        style={imgStyle}
        alt="Song cover art"
        src={song.song_art_image_thumbnail_url || song.header_image_thumbnail_url}
      />
    </div>
  );
};

const Lyrics = ({ lyrics, searchTerm } : {
  lyrics: string,
  searchTerm: string
}) => {
  if (!lyrics) { return (<div>No lyrics found</div>); }

  //   const regex = new RegExp(searchTerm, 'gi');
  //   return (
  //     <div>
  //       {lyrics.split('<br>').map((lyric, i) => (
  //         <span key={i}>
  //           {lyric.split(regex).map((partial, j) => (
  //             <span key={`${i}-${j}`}>
  //               <span>{partial}</span>
  //               {' '}
  //               <span style={{ backgroundColor: '#FFFF00' }}>{searchTerm}</span>
  //             </span>
  //           ))}
  //           <br />
  //         </span>
  //       ))}
  //     </div>
  //   );

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{
      __html: lyrics,
    }}
    />
  );
};

const highlightLyrics = (lyrics:string, searchTerm:string) : string => {
  if (!lyrics || !searchTerm) { return lyrics; }
  let newLyrics = lyrics;
  const termReplaceRegex = new RegExp(searchTerm, 'ig');
  const matches = lyrics.match(termReplaceRegex);
  if (matches && matches.length !== 0) {
    const matchStrings = matches.map((x) => x);
    const set = new Set(matchStrings) as any;
    const distinctMatches = [...set] as string[];
    distinctMatches.forEach((match) => {
      newLyrics = newLyrics.replaceAll(match, `<span style="background-color: #FFFF00">${match}</span>`);
    });
  }

  return newLyrics;
};

const SongView = ({ song, searchTerm } : {
  song : Song,
  searchTerm: string
}) => {
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    async function getLyrics() {
      const lyricsRes = await searchLyrics(song.path);
      setLyrics(highlightLyrics(lyricsRes.lyrics, searchTerm));
    }
    getLyrics();
  }, [song]);

  return (
    <div style={{ width: '50%' }}>
      <SongInfo song={song} />
      <Lyrics lyrics={lyrics} searchTerm={searchTerm} />
    </div>
  );
};

export default SongView;

/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Song, SongWithLyricsHighlight } from '../../types';
import { searchLyrics, searchYoutubeVideos } from '../../external-api';
import * as S from './styles';
import './styles.css';

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

const Lyrics = ({ path, searchTerm } : {
  path: string,
  searchTerm: string
}) => {
  if (!path) return null;

  const [lyrics, setLyrics] = useState<string>('');
  useEffect(() => {
    async function getLyrics() {
      const lyricsRes = await searchLyrics(path);
      setLyrics(highlightLyrics(lyricsRes.lyrics, searchTerm));
    }
    getLyrics();
  }, [path]);

  if (!lyrics) { return (<div>No lyrics found</div>); }
  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{
      __html: lyrics,
    }}
    />
  );
};

const Video = ({ song } : { song: SongWithLyricsHighlight }) => {
  if (!song) {
    return null;
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    setIsOpen(false);
    async function getVideoUrl() {
      const videoRes = await searchYoutubeVideos(`${song.title} ${song.artist}`);
      if (videoRes.length > 0) {
        setVideoUrl(videoRes[0].videoID);
      }
    }
    getVideoUrl();
  }, [song]);

  if (isOpen) {
    return (
      <div>
        <div className="video-container">
          <iframe
            width="500"
            height="300"
            src={`https://www.youtube-nocookie.com/embed/${videoUrl}?autoplay=0`}
            title="Embedded YT video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>Play Youtube video</button>
      </div>
    );
  }

  return null;
};

const SongView = ({ song, searchTerm } : {
  song : Song,
  searchTerm: string
}) => {
  return (
    <div style={{ width: '50%' }}>
      <SongInfo song={song} />
      <Video song={song} />
      {song.path && <Lyrics path={song.path} searchTerm={searchTerm} />}
    </div>
  );
};

export default SongView;

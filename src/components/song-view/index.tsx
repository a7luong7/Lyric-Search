/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { Song, SongWithLyricsHighlight } from '../../types';
import { getSong, searchLyrics, searchYoutubeVideos } from '../../external-api';
import * as S from './styles';
import './styles.css';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory,
} from 'react-router-dom';
import LoadingSpinner from '../loading-spinner';
import Button from '../button';
import SongsContext from '../../contexts';
import { Icon } from '../icon';

const SongInfo = ({ song } : { song:Song }) => {
  const imgStyle = {
    maxHeight: '300px',
    maxWidth: '300px',
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
      <Link to="/">back to search</Link>
      <div>
        <img
          style={imgStyle}
          alt="Song cover art"
          src={song.song_art_image_thumbnail_url || song.header_image_thumbnail_url}
        />
      </div>

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lyrics, setLyrics] = useState<string>('');
  useEffect(() => {
    async function getLyrics() {
      setIsLoading(true);
      try {
        const lyricsRes = await searchLyrics(path);
        setIsLoading(false);
        setLyrics(highlightLyrics(lyricsRes.lyrics, searchTerm));
      } catch (e) {
        setIsLoading(false);
      }
    }
    getLyrics();
  }, [path]);

  if (isLoading) { return <LoadingSpinner text="Loading lyrics..." />; }
  if (!lyrics) { return (<div>No lyrics found</div>); }
  return (
    <div
      style={{ textAlign: 'left', margin: 'auto', maxWidth: '500px' }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: lyrics,
      }}
    />
  );
};

const Video = ({ song } : { song: SongWithLyricsHighlight }) => {
  if (!song) {
    return null;
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [songsState, dispatch] = useContext(SongsContext);

  useEffect(() => {
    setIsOpen(false);
    setIsLoading(true);
    async function getVideoUrl() {
      try {
        const videoRes = await searchYoutubeVideos(`${song.title} ${song.artist}`);
        setIsLoading(false);
        if (videoRes.length > 0) {
          setVideoUrl(videoRes[0].videoID);
        }
      } catch (e) {
        setIsLoading(false);
        dispatch({
          type: 'SET_ERROR',
          data: 'Sorry, could not find song on Youtube',
        });
      }
    }
    getVideoUrl();
  }, [song]);

  if (isLoading) {
    return <LoadingSpinner text="Loading Youtube link" />;
  }

  if (isOpen) {
    return (
      <div>
        <div className="video-container">
          <iframe
            width="500"
            height="300"
            src={`https://www.youtube-nocookie.com/embed/${videoUrl}?autoplay=1`}
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
        <Button type="button" onClick={() => setIsOpen(true)}>
          <Icon icon="play" />
          {' '}
          Play Youtube Video
        </Button>
      </div>
    );
  }

  return null;
};

const SongView = ({ searchTerm } : {
  searchTerm: string
}) => {
  const history = useHistory();
  const [songsState, dispatch] = useContext(SongsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const { id } : any = useParams();
  if (!id || Number.isNaN(Number(id))) {
    history.push('/');
    return null;
  }

  useEffect(() => {
    const existingSong = songsState.songs.find((x) => x.id === Number(id));
    if (existingSong) {
      setCurrentSong(existingSong);
      return;
    }

    setIsLoading(true);
    async function loadSong() {
      try {
        const songRes = await getSong(id);
        setIsLoading(false);
        if (songRes) {
          setCurrentSong(songRes);
        }
      } catch (e) {
        history.push('/');
      }
    }

    loadSong();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner text="Attempting to load song" />;
  }
  if (!currentSong) {
    // history.push('/');
    return null;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <SongInfo song={currentSong} />
      <Video song={currentSong} />
      {currentSong.path && <Lyrics path={currentSong.path} searchTerm={searchTerm} />}
    </div>
  );
};

export default SongView;

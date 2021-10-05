/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import { searchSongs } from '../../external-api';
import { Song, SongWithLyricsHighlight, LyricsHighlight } from '../../types';
import * as S from './styles';
import SongsContext from '../../contexts';

const SongLyricHighlight = ({ highlights } : { highlights: LyricsHighlight[] }) => {
  const highlight = highlights.find((x) => x.property === 'lyrics');
  if (!highlight) { return null; }

  let highlightsStr = highlight.value;
  highlight
    .ranges
    .slice()
    .reverse()
    .forEach((range) => {
      highlightsStr = `${highlightsStr.slice(0, range.end)}</b>${highlightsStr.slice(range.end)}`;
      highlightsStr = `${highlightsStr.slice(0, range.start)}<b>${highlightsStr.slice(range.start)}`;
    });

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{
      __html: highlightsStr,
    }}
    />
  );
};

const SongItem = ({ song, handleClick } : {
  song: SongWithLyricsHighlight,
  handleClick: () =>void
}) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (song.song_art_image_thumbnail_url) {
      setImgUrl(song.song_art_image_thumbnail_url);
    } else if (song.header_image_thumbnail_url) {
      setImgUrl(song.header_image_thumbnail_url);
    }
  }, []);

  return (
    <S.SongItem
      onClick={handleClick}
      onKeyDown={handleClick}
      role="menuitem"
      tabIndex={0}
      style={{ marginBottom: '.5rem' }}
    >
      <S.SongItemImgWrapper>
        {imgUrl
          ? <S.SongItemImg src={imgUrl} alt="Album art" />
          : <div>Loading...</div>}
      </S.SongItemImgWrapper>
      <div>
        <S.SongTitle>{song.title}</S.SongTitle>
        <S.SongArtist>{song.artist}</S.SongArtist>
        <br />
        {song.highlights && <SongLyricHighlight highlights={song.highlights} />}
      </div>
    </S.SongItem>
  );
};

const LoadMoreButton = () => {
  const [songsState, dispatch] = useContext(SongsContext);
  if (!songsState.query || !songsState.nextPage || songsState.isLoading) {
    return null;
  }

  const handleClick = async (e: React.SyntheticEvent) => {
    dispatch({ type: 'SET_LOADING' });
    const lyricsSearchRes = await searchSongs(songsState.query, songsState.nextPage || 1);
    // setSongResults(lyricsSearchRes.songs || []);
    dispatch({
      type: 'APPEND_SONGS',
      data: {
        songs: lyricsSearchRes.songs,
        nextPage: lyricsSearchRes.nextPage,
      },
    });
  };

  return (
    <button
      type="button"
      disabled={songsState.isLoading}
      onClick={handleClick}
    >
      Load more songs
    </button>
  );
};

const SongList = () => {
  const [songsState, dispatch] = useContext(SongsContext);
  const { songs, query, isLoading } = songsState;
  const setCurrentSong = (song:SongWithLyricsHighlight) => {
    dispatch({
      type: 'SET_CURRENT_SONG',
      data: song.id,
    });
  };

  if (songs.length === 0 && query && !isLoading) { return (<div>No songs found</div>); }

  return (
    <div>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          handleClick={() => setCurrentSong(song)}
        />
      ))}
      {isLoading && <div>Loading songs...</div>}
      <LoadMoreButton />
    </div>
  );
};

export default SongList;

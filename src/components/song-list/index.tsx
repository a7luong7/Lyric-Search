/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useHistory,
} from 'react-router-dom';
import { searchSongs } from '../../external-api';
import { Song, SongWithLyricsHighlight, LyricsHighlight } from '../../types';
import * as S from './styles';
import * as Grid from '../../styles';
import SongsContext from '../../contexts';
import SelectGroupOption from '../select-group';
import { Icon } from '../icon';
import Button from '../button';
import LoadingSpinner from '../loading-spinner';

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
  highlightsStr = `<span style='color:#6c757d'>${highlightsStr}</span>`;

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{
      __html: highlightsStr,
    }}
    />
  );
};

const SongTile = ({ song, handleClick } : {
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

  const style = {
    borderRadius: '0.25rem',
    padding: '0.5rem',
    marginBottom: '0.25rem',
    backgroundColor: '#E5EAF5',
  };

  return (
    <Grid.Col
      xs={12}
      sm={6}
      lg={3}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="menuitem"
      tabIndex={0}
      style={style}
    >
      <S.SongImgWrapper>
        {imgUrl
          ? <S.SongItemImg src={imgUrl} alt="Album art" />
          : <div>Loading...</div>}
      </S.SongImgWrapper>
      <div>
        <S.SongTitle>{song.title}</S.SongTitle>
        <S.SongArtist>{song.artist}</S.SongArtist>
        <br />
        {song.highlights && <SongLyricHighlight highlights={song.highlights} />}
      </div>
    </Grid.Col>
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

    try {
      const lyricsSearchRes = await searchSongs(songsState.query, songsState.nextPage || 1);
      dispatch({
        type: 'APPEND_SONGS',
        data: {
          songs: lyricsSearchRes.songs,
          nextPage: lyricsSearchRes.nextPage,
        },
      });
    } catch (ex:any) {
      dispatch({
        type: 'SET_ERROR',
        data: ex.message as string,
      });
    }
  };

  return (
    <Button
      type="button"
      disabled={songsState.isLoading}
      onClick={handleClick}
      style={{ margin: '0 auto', marginTop: '.5em' }}
    >
      Load More Results
    </Button>
  );
};

const ViewSelector = ({ value, setValue } : {
  value: any,
  setValue: (val:any) => void
}) => {
  const handleClick = (e:any) => {
    setValue(e.target.closest('button').value);
  };

  return (
    <div>
      <SelectGroupOption value="tiles" selectedValue={value} handleClick={handleClick}>
        <Icon icon="th-large" />
      </SelectGroupOption>
      <SelectGroupOption value="list" selectedValue={value} handleClick={handleClick}>
        <Icon icon="list" />
      </SelectGroupOption>
    </div>
  );
};

const SongControls = ({ songs, view, setView } : {
  songs:Song[],
  view: string,
  setView: (s:string)=>void
}) => (
  <div style={{ display: 'flex', margin: '.25rem 0' }}>
    <div style={{ marginRight: 'auto' }}>
      Showing
      {' '}
      {songs.length}
      {' '}
      results
    </div>
    <ViewSelector value={view} setValue={setView} />
  </div>
);

const SongList = () => {
  const [songsState, dispatch] = useContext(SongsContext);
  const [view, setView] = useState<string>('tiles');
  const history = useHistory();

  const { songs, query, isLoading } = songsState;
  const setCurrentSong = (song:SongWithLyricsHighlight) => {
    dispatch({
      type: 'SET_CURRENT_SONG',
      data: song.id,
    });
    history.push(`/songs/${song.id}`);
  };

  useEffect(() => {
    document.title = 'Search Songs by Lyrics';
  }, []);

  if (songs.length === 0 && query && !isLoading) { return (<div>No songs found</div>); }

  return (
    <div>
      {query && <SongControls songs={songs} view={view} setView={setView} /> }
      <div>
        {view === 'list' && songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            handleClick={() => setCurrentSong(song)}
          />
        ))}
        {view === 'tiles'
        && (
        <Grid.Row>
          { songs.map((song) => (
            <SongTile
              key={song.id}
              song={song}
              handleClick={() => setCurrentSong(song)}
            />
          ))}
        </Grid.Row>
        )}
        {isLoading && <LoadingSpinner text="Loading songs..." />}
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadMoreButton />
      </div>

    </div>
  );
};

export default SongList;

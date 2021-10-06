export interface SongsState {
  songs: SongWithLyricsHighlight[],
  currentSong: SongWithLyricsHighlight | null,
  query: string,
  nextPage: number | null,
  isLoading: boolean,
  isError: boolean
}

interface SetQuery {
  type: 'SET_QUERY',
  data: string
}

interface SetSongsAction {
  type: 'SET_SONGS',
  data: {
    songs: SongWithLyricsHighlight[],
    query: string,
    nextPage: number | null
  }
}

interface SetCurrentSongAction {
  type: 'SET_CURRENT_SONG',
  data: number
}

interface AppendSongsAction {
  type: 'APPEND_SONGS',
  data: {
    songs: SongWithLyricsHighlight[],
    nextPage: number | null
  }
}

interface SetLoading {
  type: 'SET_LOADING',
}

interface SetError {
  type: 'SET_ERROR',
  data: string
}

export type SongsAction =
    | AppendSongsAction
    | SetSongsAction
    | SetCurrentSongAction
    | SetLoading
    | SetError
    | SetQuery;

export interface Song {
  id: number,
  api_path: string,
  path: string,
  full_title: string,
  title: string,
  title_with_featured: string,
  artist: string,
  lyrics_state: string,
  lyrics_owner_id?: number,
  song_art_image_url?: string,
  song_art_image_thumbnail_url?: string,
  header_image_url?: string,
  header_image_thumbnail_url?: string,
}

export interface LyricsHighlight {
  property: string,
  value: string,
  snippet: boolean,
  ranges: [{
    start: number,
    end: number
  }]
}

export interface SongWithLyricsHighlight extends Song{
  highlights?: LyricsHighlight[]
}

export interface SongSearchResponse {
  songs: SongWithLyricsHighlight[],
  nextPage: number | null
}

export interface LyricsRes {
  lyrics: string
}

export interface YoutubeSearchResult {
  videoID: string,
  channelID: string,
  title: string,
  description: string,
  publishedAt: string,
  thumbnails: {
    default: string,
    medium: string,
    high: string
  }
}

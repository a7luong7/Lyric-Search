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

export interface LyricsRes {
  lyrics: string
}

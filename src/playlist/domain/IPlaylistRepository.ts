import { Playlist } from './playlist';

export interface IPlaylistRepository {
  findPlaylistById(id: string): Promise<Playlist>;
  findPlaylistsByArtistId(id: string): Promise<Playlist[]>;
  findTopPlaylists(): Promise<Playlist[]>;
  findTopAlbums(): Promise<Playlist[]>;
  saveStream(id: string);
  browsePlaylists(query: string, album: boolean): Promise<Playlist[]>;
}

import { Playlist } from './playlist';

export interface IPlaylistRepository {
  findPlaylistById(id: string): Promise<Playlist>;
  findPlaylistsByArtistId(id: string): Promise<Playlist[]>;
}
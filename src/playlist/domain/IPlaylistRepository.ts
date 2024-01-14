import { Playlist } from './playlist';
import { PlaylistID } from './value-objects/PlaylistID-valueobject';

export interface IPlaylistRepository {
  findPlaylistById(id: string): Promise<Playlist>;
  findPlaylistsByArtistId(id: string): Promise<Playlist[]>;
  findTopPlaylists(): Promise<Playlist[]>;
  findTopAlbums(): Promise<Playlist[]>;
  saveStream(id: PlaylistID): Promise<boolean>;
  browsePlaylists(
    query: string,
    album: boolean,
    limit: number,
    offset: number,
  ): Promise<Playlist[]>;
  findAlbumById(id: string): Promise<Playlist>;
}

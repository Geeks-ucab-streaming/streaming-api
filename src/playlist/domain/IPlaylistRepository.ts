import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Playlist } from './playlist';
import { PlaylistID } from './value-objects/PlaylistID-valueobject';

export interface IPlaylistRepository {
  findPlaylistById(id: PlaylistID): Promise<Playlist>;
  findPlaylistsByArtistId(id: ArtistID): Promise<Playlist[]>;
  findTopPlaylists(): Promise<Playlist[]>;
  findTopAlbums(): Promise<Playlist[]>;
  saveStream(id: PlaylistID): Promise<boolean>;
  browsePlaylists(
    query: string,
    album: boolean,
    limit: number,
    offset: number,
  ): Promise<Playlist[]>;
  findAlbumById(id: PlaylistID): Promise<Playlist>;
}

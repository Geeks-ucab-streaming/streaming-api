import { Song } from './song';
import { SongID } from './value-objects/SongID-valueobject';

export interface ISongRepository {
  findById(id: SongID): Promise<Song>;
  findByArtistId(id: string): Promise<Song[]>;
  findByPlaylistId(id: string): Promise<Song[]>;
  findSongsInCollection(ids: string[]): Promise<Song[]>;
}

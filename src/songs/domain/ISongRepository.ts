import { Song } from './song';

export interface ISongRepository {
  findById(id: string): Promise<Song>;
  findByArtistId(id: string): Promise<Song[]>;
  findByPlaylistId(id: string): Promise<Song[]>;
}

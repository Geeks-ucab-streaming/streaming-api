import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Song } from './song';
import { SongID } from './value-objects/SongID-valueobject';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';

export interface ISongRepository {
  findById(id: SongID): Promise<Song>;
  findByArtistId(id: ArtistID): Promise<Song[]>;
  findByPlaylistId(id: PlaylistID): Promise<Song[]>;
  findSongsInCollection(ids: SongID[]): Promise<Song[]>;
  browseSongsName(
    query: string,
    limit: number,
    offset: number,
  ): Promise<Song[]>;
  findTrendingSongs(): Promise<Song[]>;
  saveStream(id: SongID);
}

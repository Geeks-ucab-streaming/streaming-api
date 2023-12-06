import { Artist } from './artist';
import { ArtistID } from './value-objects/artistID-valueobject';

export interface IArtistsRepository {
  findAllArtists(): Promise<Artist[]>;
  findArtistById(id: ArtistID): Promise<Artist>;
}

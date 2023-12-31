import { Artist } from './artist';
import { ArtistID } from './value-objects/artistID-valueobject';

export interface IArtistsRepository {
  findAllArtists(): Promise<Artist[]>;
  findTrendingArtists(): Promise<Artist[]>;
  findArtistById(id: ArtistID): Promise<Artist>;
  // findArtistById(id: string): Promise<Artist>;
  findArtistsInCollection(ids: string[]): Promise<Artist[]>;
  browseArtistsName(query: string): Promise<Artist[]>;
}

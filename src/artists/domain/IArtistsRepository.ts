import { Artist } from './artist';

export interface IArtistsRepository {
  findAllArtists(): Promise<Artist[]>;
  findArtistById(id: string): Promise<Artist>;
  findArtistsInCollection(ids: string[]): Promise<Artist[]>;
}

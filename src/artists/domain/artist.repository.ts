import { Artist } from './artist';

export interface IArtistRepository {
  save(artist: Artist): Promise<Artist>;
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist>;
}

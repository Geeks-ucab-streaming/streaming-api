import { Artist } from './artist';

export interface IArtistRepository {
  save(artist: Artist): Promise<Artist>;
  findAll(): Promise<Artist[]>;
  findOne(id: string): Promise<Artist>;
}

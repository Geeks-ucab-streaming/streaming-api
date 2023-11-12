import { Artist } from './artist';

export interface IArtistService {
  create(artist: Artist): Promise<Artist>;
  findAll(): Promise<Artist[]>;
}
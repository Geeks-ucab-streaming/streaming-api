import { Artist } from "./artist";

export interface ArtistRepository {
  save(artist: Artist): Promise<Artist>;
  findAll(): Promise<Artist[]>;
  findOne(id: string): Promise<Artist>;
}

import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Song } from 'src/songs/domain/song';

export class GetArtistGenre {
  static instance: GetArtistGenre;
  private constructor() {}

  public static getInstance(): GetArtistGenre {
    if (!GetArtistGenre.instance) {
      GetArtistGenre.instance = new GetArtistGenre();
    }
    return GetArtistGenre.instance;
  }

  execute(songs: Song[]): string {
    const genres = songs.flatMap((song) => song.Genres);
    if (genres.length === 0) return null;

    const mostCommonGenre = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc; 
    }, {});
    const genre: string = Object.keys(mostCommonGenre).reduce((a, b) =>
      mostCommonGenre[a] > mostCommonGenre[b] ? a : b,
    );
    return genre;
  }
}

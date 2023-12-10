import { Artist } from 'src/artists/domain/artist';
import { Song } from 'src/songs/domain/song';

export class SongWithArtistPO {
  public song: Song;
  public creators: Artist[];

  constructor(song: Song, creators: Artist[]) {
    (this.song = song), (this.creators = creators);
  }
}

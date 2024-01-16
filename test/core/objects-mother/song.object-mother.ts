import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Song } from 'src/songs/domain/song';

export class SongObjectMother {
  static createSong(): Song {
    let song = Song.create(
      'c51ab77e-61d1-44a1-956f-09cd63231e48',
      'Canción de prueba',
      180,
      new Date(),
      'prueba.mp3',
      'prueba.jpg',
      6,
      ['A', 'B'],
      [ArtistID.create('4aa6f4ed-ab3f-4651-9e96-9e6bac0792d1')],
    );
    return song;
  }
}

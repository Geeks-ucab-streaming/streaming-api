import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Artist } from '../../../src/artists/domain/artist';
import { ArtistName } from 'src/artists/domain/value-objects/artistName-valueobject';
import { ArtistImage } from 'src/artists/domain/value-objects/artistImage-valueobject';
import { ArtistStreams } from 'src/artists/domain/value-objects/artistStreams-valueobject';

export class ArtistObjectMother {
  static createArtist(): Artist {
    let artist = Artist.create(
      ArtistID.create('4aa6f4ed-ab3f-4651-9e96-9e6bac0792d1'),
      ArtistName.create('Artista A'),
      ArtistImage.create('AritstA.jpg'),
      ArtistStreams.create(6),
    );
    return artist;
  }
}

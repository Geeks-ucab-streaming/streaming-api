import { Expose } from 'class-transformer';
import { Artist } from 'src/artists/domain/artist';

export class ArtistDto extends Artist {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  image_reference: string;
}

import { IsString, MinLength } from 'class-validator';
import { Artist } from 'src/artists/domain/artist';

export class CreateArtistDto extends Artist {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(1)
  image_reference: string;
}

import { IsString, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(1)
  duration: string;

  @IsString()
  @MinLength(1)
  image_reference: string;
}

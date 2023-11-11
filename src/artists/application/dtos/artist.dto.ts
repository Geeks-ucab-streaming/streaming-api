import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ArtistDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  duration: string;

  @Expose()
  image_reference: string;
}

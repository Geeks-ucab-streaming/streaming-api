import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class SongDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  duration: string;

  @Expose()
  creation_date: Date;

  @Expose()
  song_reference: string;

  @Expose()
  preview_reference: string;

  @Expose()
  image_reference: string;

  @Expose()
  reproductions: number;

  @Expose()
  genres: string[];

  @Transform(({ obj }) => obj.artist.id)
  @Expose()
  artistId: number;
}

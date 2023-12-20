import { Expose } from 'class-transformer';
import { Playlist } from 'src/playlist/domain/playlist';

export class PlaylistDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  duration: string;

  @Expose()
  image_reference: string;

  @Expose()
  reproductions: number;
}

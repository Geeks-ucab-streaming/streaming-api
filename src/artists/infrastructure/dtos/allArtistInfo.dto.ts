import { SongDto } from 'src/songs/infrastructure/dtos/Song.dto';

export class AllArtistInfoDto {
  id: string;
  name: string;
  image: Buffer;
  genre: string;
  albums: {
    id: string;
    image: Buffer;
  }[];
  songs: SongDto[];
}

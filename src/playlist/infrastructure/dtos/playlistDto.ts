import { SongDto } from 'src/songs/infrastructure/dtos/Song.dto';

export class PlaylistDto {
  id: string;
  name: string;
  duration: string;
  image: Buffer;
  streams: number;
  creators?: {
    creatorId: string;
    creatorName: string;
  }[];
  songs: SongDto[];
}

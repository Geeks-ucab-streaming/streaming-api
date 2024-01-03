import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';

export interface IStreamRepository {
  saveSongStream(user: string, song: string);
}

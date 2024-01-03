import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';

export interface IPlaylistStreamRepository {
  savePlaylistStream(user: string, playlist: string): Promise<boolean>;
}

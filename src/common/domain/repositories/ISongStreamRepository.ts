import { Song } from 'src/songs/domain/song';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { User } from 'src/users/domain/userAggregate/user';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';

export interface IStreamRepository {
  saveSongStream(user: userId, song: SongID): Promise<boolean>;
}

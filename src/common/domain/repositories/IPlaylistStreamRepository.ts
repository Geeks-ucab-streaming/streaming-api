import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';
import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';

export interface IPlaylistStreamRepository {
  savePlaylistStream(user: userId, playlist: PlaylistID): Promise<boolean>;
}

import { DataSource, Repository } from 'typeorm';
import { IStreamRepository } from '../../domain/repositories/ISongStreamRepository';
import { ReproducedSong } from '../entities/ReproducedSong.entity';
import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { UserEntity } from 'src/users/infrastructure/entities/users.entity';
import { ReproducedPlaylist } from '../entities/ReproducedPlaylist.entity';
import { IPlaylistStreamRepository } from 'src/common/domain/repositories/IPlaylistStreamRepository';
import { PlaylistEntity } from 'src/playlist/infrastructure/entities/playlist.entity';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';

export class PlaylistStreamsRepository
  extends Repository<ReproducedPlaylist>
  implements IPlaylistStreamRepository
{
  constructor(dataSource: DataSource) {
    super(ReproducedPlaylist, dataSource.manager);
  }

  async savePlaylistStream(
    user: userId,
    playlistId: PlaylistID,
  ): Promise<boolean> {
    const previousStream = await this.findStream(user.Id, playlistId.Value);

    if (previousStream) {
      if (this.validatePreviousStream(previousStream.reproduced_date)) {
        this.insertStream(user.Id, playlistId.Value);
        return true;
      } else return false;
    } else {
      this.insertStream(user.Id, playlistId.Value);
      return true;
    }
  }
  validatePreviousStream(previousStreamDate: Date): boolean {
    const currentDate = new Date();
    const timeDifferenceInMilliseconds =
      currentDate.getTime() - previousStreamDate.getTime();
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    return timeDifferenceInMilliseconds > millisecondsInOneDay;
  }

  async findStream(
    user: string,
    playlist: string,
  ): Promise<ReproducedPlaylist> {
    const stream = await this.createQueryBuilder('stream')
      .where('stream.user = :user', { user })
      .andWhere('stream.playlist = :playlist', { playlist })
      .orderBy('stream.reproduced_date', 'DESC')
      .getOne();
    console.log(stream);
    if (stream) return stream;
    return null;
  }
  async insertStream(user: string, playlist: string) {
    const stream: ReproducedPlaylist = new ReproducedPlaylist();
    stream.user = await this.manager.findOne(UserEntity, {
      where: { id: user },
    });
    stream.playlist = await this.manager.findOne(PlaylistEntity, {
      where: { id: playlist },
    });
    stream.reproduced_date = new Date();
    await this.manager.save(stream);
  }
}

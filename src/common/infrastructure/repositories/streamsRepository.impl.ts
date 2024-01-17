import { DataSource, Repository } from 'typeorm';
import { IStreamRepository } from '../../domain/repositories/ISongStreamRepository';
import { ReproducedSong } from '../entities/ReproducedSong.entity';
import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { UserEntity } from 'src/users/infrastructure/entities/users.entity';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';

export class StreamRepository
  extends Repository<ReproducedSong>
  implements IStreamRepository
{
  constructor(dataSource: DataSource) {
    super(ReproducedSong, dataSource.manager);
  }

  async saveSongStream(user: userId, song: SongID): Promise<boolean> {
    const previousStream = await this.findStream(user.Id, song.Value);

    if (previousStream) {
      if (this.validatePreviousStream(previousStream.reproduced_date)) {
        this.insertStream(user.Id, song.Value);
        return true;
      } else return false;
    } else {
      this.insertStream(user.Id, song.Value);
      return true;
    }
  }

  validatePreviousStream(previousStreamDate: Date): boolean {
    const currentDate = new Date();
    const timeDifferenceInMilliseconds =
      currentDate.getTime() - previousStreamDate.getTime();
    const millisecondsInOneDay = 60 * 60 * 1000;
    return timeDifferenceInMilliseconds > millisecondsInOneDay;
  }

  async insertStream(user: string, song: string) {
    const stream: ReproducedSong = new ReproducedSong();
    stream.user = await this.manager.findOne(UserEntity, {
      where: { id: user },
    });
    stream.song = await this.manager.findOne(SongEntity, {
      where: { id: song },
    });
    stream.reproduced_date = new Date();
    await this.manager.save(stream);
  }

  async findStream(user: string, song: string): Promise<ReproducedSong> {
    const stream = await this.createQueryBuilder('stream')
      .where('stream.user = :user', { user })
      .andWhere('stream.song = :song', { song })
      .orderBy('stream.reproduced_date', 'DESC')
      .limit(1)
      .getOne();

    if (stream) return stream;
    return null;
  }
}

import { DataSource, Repository } from 'typeorm';
import { IStreamRepository } from '../../domain/repositories/ISongStreamRepository';
import { ReproducedSong } from '../entities/ReproducedSong.entity';
import { Song } from 'src/songs/domain/song';
import { User } from 'src/users/domain/userAggregate/user';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';
import { UserEntity } from 'src/users/infrastructure/entities/users.entity';

export class StreamRepository
  extends Repository<ReproducedSong>
  implements IStreamRepository
{
  constructor(dataSource: DataSource) {
    super(ReproducedSong, dataSource.manager);
  }

  async saveSongStream(user: string, song: string) {
    const stream: ReproducedSong = new ReproducedSong();
    stream.user = await this.manager.findOne(UserEntity, {
      where: { id: user },
    });
    stream.song = await this.manager.findOne(SongEntity, {
      where: { id: song },
    });
    stream.reproduced_date = new Date();
    await this.manager.save(stream);
    return;
  }
}

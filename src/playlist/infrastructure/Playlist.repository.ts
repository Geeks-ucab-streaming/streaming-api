import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { PlaylistEntity } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../domain/playlist';

export class PlaylistRepository implements IFindGenericRepository<Playlist> {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly repository: Repository<Playlist>,
  ) {}

  async find(artistId: string): Promise<Playlist[]> {
    const playlists = await this.repository
      .createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .innerJoinAndSelect('playlistCreator.artist', 'artist')
      .where('artist.id = :artistId', { artistId })
      .getMany();

    return playlists;
  }
}

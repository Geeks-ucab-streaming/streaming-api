import { Repository, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Song } from '../domain/song';
import { SongEntity } from './entities/song.entity';
import { Inject } from '@nestjs/common';
import { Factory } from 'src/common/domain/icreator.interface';

export class SongRepository implements IFindGenericRepository<Song> {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
    @Inject('SongFactory')
    private readonly songFactory: Factory<SongEntity, Song>,
  ) {}

  async find(id: string): Promise<Song> {
    const songResponse = await this.repository.findOne({
      where: { id },
      relations: ['song_artist.artist'],
    });
    return this.songFactory.factoryMethod(songResponse);
  }
}

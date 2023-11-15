import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { Song } from '../../domain/song';
import { SongEntity } from '../entities/song.entity';
import { Inject } from '@nestjs/common';
import { Factory } from 'src/common/domain/icreator.interface';

export class SongRepository implements IGenericRepository<Song> {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
    @Inject('SongFactory')
    private readonly songFactory: Factory<SongEntity, Song>,
  ) {}

  findAll(): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Song> {
    const songResponse = await this.repository.findOne({
      where: { id },
      relations: ['song_artist.artist'],
    });
    return this.songFactory.factoryMethod(songResponse);
  }
}

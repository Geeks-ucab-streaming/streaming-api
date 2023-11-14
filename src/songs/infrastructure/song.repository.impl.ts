import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { Song } from '../domain/song';
import { SongEntity } from './entities/song.entity';

export class SongRepository implements IGenericRepository<Song> {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Song> {
    return this.repository.findOne({ where: { id: id } });
  }
}

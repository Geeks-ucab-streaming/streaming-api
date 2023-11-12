import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../domain/artist';
import { ArtistEntity } from './entities/artist.entity';
import { IGenericRepository } from 'src/common/domain/generic.repository';

export class ArtistRepositoryImpl implements IGenericRepository<Artist> {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly repository: Repository<Artist>,
  ) {}


  async findAll(): Promise<Artist[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Artist> {
    return this.repository.findOne({ where: { id: id } });
  }
}

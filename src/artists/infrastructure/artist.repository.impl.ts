import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../domain/artist';
import { IArtistRepository } from '../domain/artist.repository';
import { ArtistEntity } from './entities/artist.entity';

export class ArtistRepositoryImpl implements IArtistRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly repository: Repository<Artist>,
  ) {}

  async save(artist: Artist): Promise<Artist> {
    return this.repository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.repository.findOne({ where: { id: id } });
  }
}

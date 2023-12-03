import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from '../entities/artist.entity';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';

export class OrmArtistRepository
  extends Repository<ArtistEntity>
  implements IArtistsRepository
{
  constructor(dataSource: DataSource) {
    super(ArtistEntity, dataSource.manager);
  }
  async findAllArtists(): Promise<Artist[]> {
    const artists = await this.find();
    throw new Error('Method not implemented.');
  }
  async findArtistById(id: string): Promise<Artist> {
    const artist = await this.findOne({ where: { id: id } });
    throw new Error('Method not implemented.');
  }

  // async findAll(): Promise<Artist[]> {
  //   return this.repository.find();
  // }
}

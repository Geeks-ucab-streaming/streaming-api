import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from '../entities/artist.entity';

import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { ArtistsMapper } from '../mappers/artist.mapper';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';

export class OrmArtistRepository
  extends Repository<ArtistEntity>
  implements IArtistsRepository
{
  private readonly ormArtistMapper: ArtistsMapper;
  constructor(dataSource: DataSource) {
    super(ArtistEntity, dataSource.manager);
    this.ormArtistMapper = new ArtistsMapper();
  }
  findAllArtists(): Promise<Artist[]> {
    throw new Error('Method not implemented.');
  }
  async findArtistById(id: ArtistID): Promise<Artist> {
    const ormArtist = await this.findOne({ where: { id: id.Id } });
    return ormArtist ? await this.ormArtistMapper.ToDomain(ormArtist) : null;
  }
  async findOneByTheId(id: ArtistID): Promise<Artist> {
    const ormArtist = await this.findOne({ where: { id: id.Id } });
    return ormArtist ? await this.ormArtistMapper.ToDomain(ormArtist) : null;
  }
  async saveAggregate(aggregate: Artist): Promise<void> {
    const ormArtist = await this.ormArtistMapper.domainTo(aggregate);
    await this.save(ormArtist);
    //throw new Error('Method not implemented.');
  }
  async findOneByIdOrFail(id: ArtistID): Promise<Artist> {
    const artist = await this.findOneByTheId(id);
    if (!artist) {
      // throw new InvalidPatientException();
      throw new Error('Method not implemented.');
    }
    return artist;
  }

  async findAssociatedArtists(): Promise<Artist[]> {
    throw new Error('Method not implemented.');
  }
}
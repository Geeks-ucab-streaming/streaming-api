import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from '../entities/artist.entity';
import { IArtistRepository } from 'src/artists/application/repositories/artist.repository.interface';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { ArtistsMapper } from '../mappers/artist.mapper';

export class OrmArtistRepository
  extends Repository<ArtistEntity>
  implements IArtistRepository
{
  private readonly ormArtistMapper: ArtistsMapper;
  // constructor(manager: EntityManager, queryRunner?: QueryRunner) {
  //   super(ArtistEntity, manager, queryRunner);
  //   // this.ormPatientMapper = new OrmPatientMapper();
  // }

  constructor(dataSource: DataSource) {
    super(ArtistEntity, dataSource.manager);
    this.ormArtistMapper = new ArtistsMapper();
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
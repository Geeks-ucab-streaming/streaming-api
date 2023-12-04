import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from '../entities/artist.entity';
import { IArtistRepository } from 'src/artists/application/repositories/artist.repository.interface';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';

export class OrmArtistRepository extends Repository<ArtistEntity> implements IArtistRepository {
  // private readonly ormArtistMapper: OrmArtistMapper;
  constructor(manager: EntityManager, queryRunner?: QueryRunner) {
    super(ArtistEntity, manager, queryRunner);
    // this.ormPatientMapper = new OrmPatientMapper();
  }
  findOneByTheId(id: ArtistID): Promise<Artist> {
    throw new Error('Method not implemented.');
  }
  async saveAggregate(aggregate: Artist): Promise<void> {
    // const ormArtist=await this.ormArtistMapper.fromDomainToOther(aggregate);
    // await this.save(ormArtist);
    throw new Error('Method not implemented.');
  }
  async findOneByIdOrFail(id: ArtistID): Promise<Artist> {
    throw new Error('Method not implemented.');
  }

  async findAssociatedArtists(): Promise<Artist[]> {
    throw new Error('Method not implemented.');
  }
}
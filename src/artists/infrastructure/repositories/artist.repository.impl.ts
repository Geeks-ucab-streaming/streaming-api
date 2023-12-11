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
  async findAllArtists(): Promise<Artist[]> {
    const ormArtist = await this.find();
    if(!ormArtist) throw new Error('Method not implemented.');
      const artists: Artist[] = [];
      for (const item of ormArtist) {
        const artist = await this.ormArtistMapper.ToDomain(item);
        artists.push(artist);
      }

      return artists;
  }
  async findArtistById(id: ArtistID): Promise<Artist> {
    const ormArtist = await this.findOne({ where: { id: id.Id } });
    if(!ormArtist) throw new Error('Method not implemented.');
    return await this.ormArtistMapper.ToDomain(ormArtist) as Artist;
  }
  async saveAggregate(aggregate: Artist): Promise<void> {
    const ormArtist = await this.ormArtistMapper.domainTo(aggregate);
    await this.save(ormArtist);
    //throw new Error('Method not implemented.');
  }
  async findOneByIdOrFail(id: ArtistID): Promise<Artist> {
    const artist = await this.findArtistById(id);
    if (!artist) {
      // throw new InvalidPatientException();
      throw new Error('Method not implemented.');
    }
    return artist;
  }

  async findAssociatedArtists(): Promise<Artist[]> {
    throw new Error('Method not implemented.');
  }

  async findArtistsInCollection(ids: string[]): Promise<Artist[]> {
    const artistsResponse = await this.createQueryBuilder('artist')
      .where('artist.id IN (:...ids)', { ids })
      .getMany();

    const artists: Promise<Artist>[] = [];
    artistsResponse.forEach((artist) =>
      artists.push(this.ormArtistMapper.ToDomain(artist)),
    );

    return Promise.all(artists);
  }
}

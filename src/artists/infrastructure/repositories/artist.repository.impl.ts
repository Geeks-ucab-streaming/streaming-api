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
  async saveStream(id: string) {
    const artist = await this.findOne({ where: { id } });

    if (!artist) {
      throw new Error(`Artista con ID ${id} no encontrado`);
    }
    artist.reproductions += 1;

    await this.save(artist);
  }

  async browseArtistsName(query: string): Promise<Artist[]> {
    const artistsResponse = await this.createQueryBuilder('artist')
      .orWhere('artist.name ILIKE :query', { query: `%${query}%` })
      .getMany();
    const artists: Promise<Artist>[] = [];
    if (artistsResponse.length > 0)
      artistsResponse.forEach((artist) =>
        artists.push(this.ormArtistMapper.ToDomain(artist)),
      );
    return await Promise.all(artists);
  }

  async findTrendingArtists(): Promise<Artist[]> {
    const ormArtists = await this.createQueryBuilder('artist')
      .orderBy('artist.reproductions', 'DESC')
      .getMany();

    let artists: Artist[] = [];
    for (const artist of ormArtists) {
      artists.push(await this.ormArtistMapper.ToDomain(artist));
    }

    return artists;
  }
  async findAllArtists(): Promise<Artist[]> {
    const ormArtist = await this.find();
    if (!ormArtist) throw new Error('Method not implemented.');
    const artists: Artist[] = [];
    for (const item of ormArtist) {
      const artist = await this.ormArtistMapper.ToDomain(item);
      artists.push(artist);
    }

    return artists;
  }
  async findArtistById(id: ArtistID): Promise<Artist> {
    const ormArtist = await this.findOne({ where: { id: id.Value } });
    if (!ormArtist) throw new Error('Method not implemented.');
    return (await this.ormArtistMapper.ToDomain(ormArtist)) as Artist;
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

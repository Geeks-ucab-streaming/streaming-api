import { Imapper } from 'src/common/Application/IMapper';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { Artist } from 'src/artists/domain/artist';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { ArtistName } from 'src/artists/domain/value-objects/artistName-valueobject';
import { ArtistImage } from 'src/artists/domain/value-objects/artistImage-valueobject';
import { ArtistStreams } from 'src/artists/domain/value-objects/artistStreams-valueobject';

export class ArtistsMapper implements Imapper<Artist, ArtistEntity> {
  private readonly getArtistImageService: GetFileService;

  constructor() {
    this.getArtistImageService = new GetFileService(
      process.env.ARTISTS_IMAGES_CONTAINER,
    );
  }
  async ToDomain(ormEntity: ArtistEntity): Promise<Artist> {
    if (!ormEntity) return null;
    let artist: Artist = Artist.create(
      ArtistID.create(ormEntity.id),
      ArtistName.create(ormEntity.name),
      ArtistImage.create(ormEntity.image_reference),
      ArtistStreams.create(ormEntity.reproductions),
    );
    artist.setImage(
      await this.getArtistImageService.execute(artist.ImageReference.Image),
    );
    return artist;
  }

  async domainTo(domainEntity: Artist): Promise<ArtistEntity> {
    if (!domainEntity) return null;
    let artistEntity: ArtistEntity = await ArtistEntity.create(
      domainEntity.Id.Value,
      domainEntity.Name.Value,
      domainEntity.ImageReference.Image,
    );
    return artistEntity;
  }
}

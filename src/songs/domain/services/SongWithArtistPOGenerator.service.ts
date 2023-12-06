import { IGenericDomainService } from 'src/common/domain/services/generic-domain.service.interface';
import { SongID } from '../value-objects/SongID-valueobject';
import { SongWithArtistPO } from '../ParameterObjects/songWithArtistPO';
import { ISongRepository } from '../ISongRepository';
import { IArtistRepository } from 'src/artists/application/repositories/artist.repository.interface';

export class SongWithArtistPOGeneratorService
  implements IGenericDomainService<string, SongWithArtistPO>
{
  private readonly songRepository: ISongRepository;
  private readonly artistRepository: IArtistRepository;
  constructor(
    songRepository: ISongRepository,
    artistRepository: IArtistRepository,
  ) {
    this.songRepository = songRepository;
    this.artistRepository = artistRepository;
  }
  execute(id: string): Promise<SongWithArtistPO> {
    throw new Error('Method not implemented.');
  }
}

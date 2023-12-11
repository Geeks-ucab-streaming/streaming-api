import { Artist } from 'src/artists/domain/artist';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { IRepository } from 'src/common/Application/repository.interface';
import { RepositoryPagingDto } from 'src/common/repositories/repository-paging.dto';

export class SearchAssociatedArtistDomainDto {
  name: string;
  image_reference: string;
}

export interface IArtistRepository extends IRepository<ArtistID, Artist> {
  findAssociatedArtists(
    asociated: SearchAssociatedArtistDomainDto,
    options: RepositoryPagingDto,
  ): Promise<Artist[]>;

  findArtistsInCollection(ids: string[]): Promise<Artist[]>;
}

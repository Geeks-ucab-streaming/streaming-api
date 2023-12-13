import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { IFindService } from 'src/common/domain/ifind.service';

export class FindArtistsInCollectionService
  implements IFindService<string[], Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}

  async execute(ids: string[]): Promise<Artist[]> {
    return await this.artistRepository.findArtistsInCollection(ids);
  }
}

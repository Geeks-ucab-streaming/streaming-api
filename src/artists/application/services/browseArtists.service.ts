import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { Artist } from 'src/artists/domain/artist';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';

export class BrowseArtistService
  implements IApplicationService<String, Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(query: string): Promise<Result<Artist[]>> {
    return Result.success<Artist[]>(
      await this.artistRepository.browseArtistsName(query),
    );
  }
}

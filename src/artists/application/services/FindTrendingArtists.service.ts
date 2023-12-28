import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';

export class GetTrendingArtistsService
  implements IApplicationService<GetTrendingArtistsService, Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}

  get name(): string {
    return this.constructor.name;
  }
  async execute(): Promise<Result<Artist[]>> {
    const artists = await this.artistRepository.findTrendingArtists();
    return Result.success<Artist[]>(artists);
  }
}

import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { Artist } from 'src/artists/domain/artist';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export class BrowseArtistService
  implements IApplicationService<String, Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(query: string): Promise<Result<Artist[]>> {
    const response = await this.artistRepository.browseArtistsName(query, 5, 0);
    if (response)
      return Result.success<Artist[]>(
        await this.artistRepository.browseArtistsName(query, 5, 0),
      );
    else
      return Result.fail<Artist[]>(
        new DomainException<Artist[]>(
          void 0,
          `No se encontraron artistas por: ${query}`,
          'DomainException',
          404,
        ),
      );
  }
}

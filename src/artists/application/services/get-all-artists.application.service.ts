import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { Result } from 'src/common/domain/logic/Result';

export class GetAllArtistsApplicationService
  implements IApplicationService<GetAllArtistsApplicationService, Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}

  get name(): string {
    return this.constructor.name;
  }
  async execute(): Promise<Result<Artist[]>> {
    const artists = await this.artistRepository.findAllArtists();
    if (artists) return Result.success<Artist[]>(artists);
    else
      return Result.fail<Artist[]>(
        new DomainException<Artist[]>(
          void 0,
          `No se encontraron artistas`,
          'DomainException',
          404,
        ),
      );
  }
}

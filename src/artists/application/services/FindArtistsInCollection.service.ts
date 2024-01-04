import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { IFindService } from 'src/common/domain/ifind.service';
import { Result } from 'src/common/domain/logic/Result';

export class FindArtistsInCollectionService
  implements IApplicationService<string[], Artist[]>
{
  constructor(private readonly artistRepository: IArtistsRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(ids: string[]): Promise<Result<Artist[]>> {
    const response = await this.artistRepository.findArtistsInCollection(ids);
    if (response) return Result.success(response);
    else
      return Result.fail<Artist[]>(
        new DomainException<Artist[]>(
          void 0,
          `No se encontrarón artistas con los ids: ${ids}`,
          'DomainException',
          404,
        ),
      );
  }
}

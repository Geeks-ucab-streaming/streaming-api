import { Artist } from 'src/artists/domain/artist';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IArtistRepository } from '../repositories/artist.repository.interface';
import { Result } from 'src/common/domain/logic/Result';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export interface GetArtistProfilesApplicationServiceDto {
  id?: string;
}
export class GetArtistProfilesApplicationService
  implements
    IApplicationService<GetArtistProfilesApplicationServiceDto, Artist>
{
  get name(): string {
    return this.constructor.name;
  }
  constructor(private readonly artistRepository: IArtistsRepository) {}

  async execute(
    dto?: GetArtistProfilesApplicationServiceDto,
  ): Promise<Result<Artist>> {
    const artist = await this.artistRepository.findArtistById(
      ArtistID.create(dto.id),
    );
    if (artist) return Result.success<Artist>(artist);
    else
      return Result.fail(
        new DomainException(
          void 0,
          `No existe ningún artista con el id: ${dto.id}`,
          'Not Found Exception',
          404,
        ),
      );
  }
}

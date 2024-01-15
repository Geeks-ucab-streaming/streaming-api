import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { GetArtistGenre } from 'src/artists/domain/services/getArtistGenreDomain.service';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { Result } from 'src/common/domain/logic/Result';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export interface GetArtistGenreServiceDto {
  id: ArtistID;
}

export class GetArtistGenreService
  implements IApplicationService<GetArtistGenreServiceDto, string>
{
  private readonly getArtistGenreService: GetArtistGenre;
  constructor(private readonly songsRepository: ISongRepository) {
    this.getArtistGenreService = GetArtistGenre.getInstance();
  }

  get name(): string {
    return this.constructor.name;
  }
  async execute(dto: GetArtistGenreServiceDto): Promise<Result<string>> {
    const songs = await this.songsRepository.findByArtistId(dto.id);
    if (songs) {
      const genre = this.getArtistGenreService.execute(songs);
      return Result.success<string>(genre);
    } else
      return Result.fail(
        new DomainException(
          void 0,
          `No se encontró ningún génro para el artista de id: ${dto.id.Value}`,
        ),
      );
  }
}

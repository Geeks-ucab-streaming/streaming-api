import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';
import { Artist } from 'src/artists/domain/artist';
import { GetArtistGenre } from 'src/artists/domain/services/getArtistGenreDomain.service';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class GetArtistGenreService
  implements IApplicationService<string, string>
{
  private readonly getArtistGenreService: GetArtistGenre;
  constructor(private readonly songsRepository: ISongRepository) {
    this.getArtistGenreService = GetArtistGenre.getInstance();
  }

  get name(): string {
    return this.constructor.name;
  }
  async execute(id: string): Promise<Result<string>> {
    const songs = await this.songsRepository.findByArtistId(id);
    if (songs) {
      const genre = this.getArtistGenreService.execute(songs);
      return Result.success<string>(genre);
    } else return null;
  }
}

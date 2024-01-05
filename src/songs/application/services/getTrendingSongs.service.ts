import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export class GetTrendingSongsService
  implements IApplicationService<void, Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(): Promise<Result<Song[]>> {
    const songs: Song[] = await this.songsRepository.findTrendingSongs();
    if (songs) return Result.success<Song[]>(songs);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna canción`,
        'Not Found Exception',
        404,
      ),
    );
  }
}

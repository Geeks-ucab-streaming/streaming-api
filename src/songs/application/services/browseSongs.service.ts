import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { Result } from 'src/common/domain/logic/Result';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Song } from 'src/songs/domain/song';

export class BrowseSongsService implements IApplicationService<String, Song[]> {
  constructor(private readonly songsRepository: ISongRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(query: string): Promise<Result<Song[]>> {
    const res = await this.songsRepository.browseSongsName(query, 5, 0);
    if (res) return Result.success<Song[]>(res);
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró ninguna canción por: ${query}`,
        'Not Found Exception',
        404,
      ),
    );
  }
}

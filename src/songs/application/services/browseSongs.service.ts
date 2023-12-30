import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Song } from 'src/songs/domain/song';

export class BrowseSongsService implements IApplicationService<String, Song[]> {
  constructor(private readonly songsRepository: ISongRepository) {}
  get name(): string {
    return this.constructor.name;
  }

  async execute(query: string): Promise<Result<Song[]>> {
    return Result.success<Song[]>(
      await this.songsRepository.browseSongsName(query),
    );
  }
}

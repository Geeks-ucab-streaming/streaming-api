import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';

export class GetTrendingSongsService
  implements IApplicationService<void, Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(): Promise<Result<Song[]>> {
    const songs: Song[] = await this.songsRepository.findTrendingSongs();
    return Result.success<Song[]>(songs);
  }
}

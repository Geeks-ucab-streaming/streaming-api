import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class FindTopPlaylistsService
  implements IApplicationService<void, Playlist[]>
{
  private readonly playlistRepository: IPlaylistRepository;
  private readonly songRepository: ISongRepository;
  private readonly calculateDurationService: CalculatePlaylistDurationService;
  constructor(
    playlistRepository: IPlaylistRepository,
    songRepository: ISongRepository,
  ) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
    this.calculateDurationService =
      CalculatePlaylistDurationService.getInstance();
  }
  get name(): string {
    return this.constructor.name;
  }

  async execute(): Promise<Result<Playlist[]>> {
    const playlists: Playlist[] =
      await this.playlistRepository.findTopPlaylists();
    if (playlists) {
      for (const playlist of playlists) {
        await this.calculateDurationService.execute(
          playlist,
          this.songRepository,
        );
      }
      return Result.success<Playlist[]>(playlists);
    }
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontraron playlists`,
        'Not Found Exception',
        404,
      ),
    );
  }
}

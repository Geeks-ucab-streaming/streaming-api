import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class FindAlbumByPlaylistIDService
  implements IApplicationService<string, Playlist>
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

  async execute(id: string): Promise<Result<Playlist>> {
    const playlist: Playlist =
      await this.playlistRepository.findPlaylistById(id);
    await this.calculateDurationService.execute(playlist, this.songRepository);
    return Result.success<Playlist>(playlist);
  }
}

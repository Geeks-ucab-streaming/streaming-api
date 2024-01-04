import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export class FindTopAlbumsService
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
    const albums: Playlist[] = await this.playlistRepository.findTopAlbums();
    if (albums) {
      for (const album of albums) {
        await this.calculateDurationService.execute(album, this.songRepository);
      }
      return Result.success<Playlist[]>(albums);
    }
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontraron albums`,
        'Not Found Exception',
        404,
      ),
    );
  }
}

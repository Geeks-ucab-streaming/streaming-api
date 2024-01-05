import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Result } from '../../../common/domain/logic/Result';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';

export class QueryDto {
  query: string;
  album: boolean;
}

export class BrowseAlbumPlaylistService
  implements IApplicationService<QueryDto, Playlist[]>
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

  async execute(dto: QueryDto): Promise<Result<Playlist[]>> {
    const response: Playlist[] = await this.playlistRepository.browsePlaylists(
      dto.query,
      dto.album,
      5,
      0,
    );
    if (response) {
      const playlists = response;
      for (const playlist of playlists) {
        await this.calculateDurationService.execute(
          playlist,
          this.songRepository,
        );
      }
      console.log(playlists);
      return Result.success<Playlist[]>(playlists);
    }
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontraron ${dto.album ? 'albums' : 'playlists'} para: ${
          dto.query
        }`,
      ),
    );
  }
}

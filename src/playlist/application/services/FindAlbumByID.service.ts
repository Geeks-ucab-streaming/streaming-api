import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { DomainException } from 'src/common/domain/exceptions/domain-exception';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
export interface FindAlbumByIDServiceDto {
  id?: PlaylistID;
}
export class FindAlbumByIDService
  implements IApplicationService<FindAlbumByIDServiceDto, Playlist>
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

  async execute(dto: FindAlbumByIDServiceDto): Promise<Result<Playlist>> {
    const playlist: Playlist = await this.playlistRepository.findAlbumById(PlaylistID.create(dto.id.Value));
    if (playlist) {
      await this.calculateDurationService.execute(
        playlist,
        this.songRepository,
      );
      return Result.success<Playlist>(playlist);
    }
    return Result.fail(
      new DomainException(
        void 0,
        `No se encontró album para el id: ${dto.id.Value}`,
        'Not Found Exception',
        404,
      ),
    );
  }
}

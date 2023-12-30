import { Inject, Injectable } from '@nestjs/common';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Result } from 'src/common/domain/logic/Result';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { CalculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

@Injectable()
export class FindAlbumByArtistIDService
  implements IApplicationService<string, Playlist[]>
{
  private readonly calculateDurationService: CalculatePlaylistDurationService =
    CalculatePlaylistDurationService.getInstance();
  constructor(
    private readonly albumRepository: IPlaylistRepository,
    private readonly songRepository: ISongRepository,
  ) {}

  get name(): string {
    return this.constructor.name;
  }

  async execute(id: string): Promise<Result<Playlist[]>> {
    const playlists: Playlist[] =
      await this.albumRepository.findPlaylistsByArtistId(id);
    for (const playlist of playlists) {
      this.calculateDurationService.execute(playlist, this.songRepository);
    }
    return Result.success<Playlist[]>(playlists);
  }
}

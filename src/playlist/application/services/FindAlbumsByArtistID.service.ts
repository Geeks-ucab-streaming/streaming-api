import { Inject, Injectable } from '@nestjs/common';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { calculatePlaylistDurationService } from 'src/playlist/domain/services/calculatePlaylistDuration.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

@Injectable()
export class FindAlbumByArtistIDService
  implements IFindService<string, Playlist[]>
{
  calculateDurationService: calculatePlaylistDurationService;
  constructor(
    private readonly albumRepository: IPlaylistRepository,
    private readonly songRepository: ISongRepository,
  ) {}

  async execute(id: string): Promise<Playlist[]> {
    const playlists: Playlist[] =
      await this.albumRepository.findPlaylistsByArtistId(id);
    for (const playlist of playlists) {
      this.calculateDurationService.execute(playlist, this.songRepository);
    }
    return playlists;
  }
}

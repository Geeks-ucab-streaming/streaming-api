import { Inject, Injectable } from '@nestjs/common';
import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';

@Injectable()
export class FindAlbumByArtistIDService
  implements IFindService<string, Playlist[]>
{
  constructor(private readonly albumRepository: IPlaylistRepository) {}

  async execute(id: string): Promise<Playlist[]> {
    return this.albumRepository.findPlaylistsByArtistId(id);
  }
}

import { IFindService } from 'src/common/domain/ifind.service';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';

export class FindAlbumByPlaylistIDService
  implements IFindService<string, Playlist>
{
  private readonly repository: IPlaylistRepository;
  constructor(repository: IPlaylistRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Playlist> {
    return await this.repository.findPlaylistById(id);
  }
}

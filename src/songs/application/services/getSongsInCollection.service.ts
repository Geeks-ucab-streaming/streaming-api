import { IFindService } from 'src/common/domain/ifind.service';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Song } from 'src/songs/domain/song';

export class GetSongsInCollectionService
  implements IFindService<String[], Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}

  async execute(songsId: string[]): Promise<Song[]> {
    return await this.songsRepository.findSongsInCollection(songsId);
  }
}

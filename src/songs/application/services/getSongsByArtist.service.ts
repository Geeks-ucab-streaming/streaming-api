import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class FindSongsByArtistIdService
  implements IFindService<String, Song[]>
{
  constructor(private readonly songsRepository: ISongRepository) {}

  async execute(artistId: string): Promise<Song[]> {
    return await this.songsRepository.findByArtistId(artistId);
  }
}

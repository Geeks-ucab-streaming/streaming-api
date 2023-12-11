import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class GetSongByIdService implements IFindService<String, Song> {
  constructor(private readonly songsRepository: ISongRepository) {}

  async execute(songId: string): Promise<Song> {
    return await this.songsRepository.findById(songId);
  }
}

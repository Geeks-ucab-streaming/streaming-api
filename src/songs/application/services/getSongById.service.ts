import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class GetSongByIdService implements IFindService<String, Song> {
  constructor(
    private readonly songsRepository: ISongRepository,
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(songId: string): Promise<Song> {
    return await this.songsRepository.findById(songId);
    const result = await this.songsRepository.findById(songId);
    const song = Array.isArray(result) ? result[0] : result;
    if (!song) {
      throw new Error('Song not found');
    }
    song.songImage = await this.getSongImageService.execute(
      song.image_reference,
    );
    return song;
  }
}

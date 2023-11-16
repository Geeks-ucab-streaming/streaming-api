import { Inject } from '@nestjs/common';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

export class GetSongByIdService implements IFindService<String, Song> {
  constructor(
    @Inject(' IFindGenericRepository')
    private readonly songsRepository: IFindGenericRepository<Song>,
    @Inject('GetSongImageService')
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(songId: string): Promise<Song> {
    // const result = await this.artistRepository.find(id);
    // const artist = Array.isArray(result) ? result[0] : result;
    // if (!artist) {
    //   throw new Error('Artist not found');
    // }
    const result = await this.songsRepository.find(songId);
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

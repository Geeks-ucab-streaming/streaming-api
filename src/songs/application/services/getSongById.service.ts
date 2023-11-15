import { Inject } from '@nestjs/common';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

export class GetSongByIdService implements IFindService<String, Song> {
  constructor(
    @Inject('IGenericRepository')
    private readonly songsRepository: IGenericRepository<Song>,
    @Inject('GetSongImageService')
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(songId: string): Promise<Song> {
    const song: Song = await this.songsRepository.findById(songId);
    song.songImage = await this.getSongImageService.execute(
      song.image_reference,
    );
    return song;
  }
}

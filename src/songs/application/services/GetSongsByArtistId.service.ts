import { Inject } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

export class FindSongsByArtistIdService
  implements IFindService<String, Song[]>
{
  constructor(
    @Inject('SongsByArtistIdRepository')
    private readonly songsByArtistId: IGenericRepository<Song[]>,
    @Inject('GetSongImageService')
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(artistId: string): Promise<Song[]> {
    const songs: Song[] = await this.songsByArtistId.findById(artistId);
    songs.forEach(async (song) => {
      song.songImage = await this.getSongImageService.execute(
        song.image_reference,
      );
    });

    console.log(songs);
    return;
  }
}

import { Inject } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

export class FindSongsByArtistIdService
  implements IFindService<String, Song[]>
{
  constructor(
    @Inject('SongsByArtistIdRepository')
    private readonly songsByArtistId: IFindGenericRepository<Song>,
    @Inject('GetSongImageService')
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(artistId: string): Promise<Song[]> {
    const songs: Song | Song[] = await this.songsByArtistId.find(artistId);

    if (Array.isArray(songs)) {
      await Promise.all(
        songs.map(async (song) => {
          song.songImage = await this.getSongImageService.execute(
            song.image_reference,
          );
        }),
      );
      return songs;
    }
  }
}

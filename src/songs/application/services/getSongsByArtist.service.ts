import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';

export class FindSongsByArtistIdService
  implements IFindService<String, Song[]>
{
  constructor(
    private readonly songsRepository: ISongRepository,
    private readonly getSongImageService: IFindService<string, Buffer>,
  ) {}

  async execute(artistId: string): Promise<Song[]> {
    return await this.songsRepository.findByArtistId(artistId);
    // const songs: Song | Song[] =
    //   await this.songsRepository.findByArtistId(artistId);

    // if (Array.isArray(songs)) {
    //   await Promise.all(
    //     songs.map(async (song) => {
    //       song.songImage = await this.getSongImageService.execute(
    //         song.image_reference,
    //       );
    //     }),
    //   );
    //   return songs;
    // }
  }
}

import { Inject } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';

export interface ArtistWithSongs {
  artist: Artist;
  songs: Song[];
}

export class GetSongByArtistId
  implements IFindService<String, ArtistWithSongs>
{
  constructor(
    @Inject('FindOneArtistService')
    private readonly findArtistService: IFindService<string, Artist>,
    @Inject('FindSongsByArtistIdService')
    private readonly findSongsByArtistIdService: IFindService<string, Song[]>,
  ) {}

  async execute(artistId: string): Promise<ArtistWithSongs> {
    const artist = await this.findArtistService.execute(artistId);

    let songs: Song[] = await this.findSongsByArtistIdService.execute(artistId);
    const artistWithSongs: ArtistWithSongs = { artist: artist, songs: songs };

    return artistWithSongs;
  }
}

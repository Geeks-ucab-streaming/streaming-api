import { IFindService } from 'src/common/domain/ifind.service';
import { Song } from 'src/songs/domain/song';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { SongWithArtistPO } from '../ParameterObjects/songWithArtistPO';
import { Artist } from 'src/artists/domain/artist';
import { IArtistsRepository } from 'src/artists/domain/IArtistsRepository';

export class GetSongByIdService
  implements IFindService<String, SongWithArtistPO>
{
  constructor(
    private readonly songsRepository: ISongRepository,
    private readonly artistRepository: IArtistsRepository,
  ) {}

  async execute(songId: string): Promise<SongWithArtistPO> {
    let creators: Artist[];
    const song: Song = await this.songsRepository.findById(songId);
    let artistsID: string[] = [];
    console.log(song);

    console.log(song.artists[0].Id);

    for (const artist of song.artists) {
      console.log(artist);
      artistsID.push(artist.Id);
    }
    console.log(artistsID);
    creators = await this.artistRepository.findArtistsInCollection(artistsID);

    return new SongWithArtistPO(song, creators);
  }
}

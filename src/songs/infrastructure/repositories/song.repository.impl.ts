import { EntityRepository, Repository } from 'typeorm';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { SongFactory } from '../songFactory';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

@EntityRepository(SongEntity)
export class OrmSongRepository
  extends Repository<SongEntity>
  implements ISongRepository
{
  private readonly getSongImageService: GetFileService;
  private readonly songFactory: SongFactory;
  constructor() {
    super();
    this.songFactory = new SongFactory();
    this.getSongImageService = new GetFileService(
      process.env.SONG_ALBUM_PLAYLIST_CONTAINER,
    );
  }
  async findById(id: string): Promise<Song> {
    console.log(id);
    const songResponse = await this.createQueryBuilder('song')
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .leftJoinAndSelect('song_artist.artist', 'artist')
      .where('song.id = :id', { id })
      .getOne();

    console.log(songResponse);
    let song: Song = this.songFactory.factoryMethod(songResponse);

    const songImage = await this.getSongImageService.execute(
      song.image_reference,
    );
    song = { ...song, songImage: songImage };

    return song;
  }
  async findByArtistId(artistId: string): Promise<Song[]> {
    const subquery = await this.createQueryBuilder('song')
      .innerJoin(
        'song.song_artist',
        'songArtist',
        'song.id = songArtist.songId',
      )
      .innerJoin('Artists', 'a', 'a.id = songArtist.artistId')
      .where('a.id = :artistId', { artistId })
      .select('song.id')
      .getMany();

    let values = [];
    subquery.forEach((sub) => values.push(sub.id));

    const songsResponse = await this.createQueryBuilder('song')
      .innerJoinAndSelect('song.song_artist', 'songArtist')
      .innerJoinAndSelect('songArtist.artist', 'artist')
      .where('song.id IN (:...values)', { values })
      .getMany();

    const songs: Song[] = [];
    songsResponse.forEach((song) =>
      songs.push(this.songFactory.factoryMethod(song)),
    );

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
  findByPlaylistId(id: string): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }
}

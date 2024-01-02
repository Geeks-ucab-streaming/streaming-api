import { DataSource, Repository } from 'typeorm';
import { Song } from 'src/songs/domain/song';
import { SongEntity } from '../entities/song.entity';
import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { SongsMapper } from '../mappers/Song.mapper';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';

export class OrmSongRepository
  extends Repository<SongEntity>
  implements ISongRepository
{
  private readonly songMapper: SongsMapper;
  constructor(dataSource: DataSource) {
    super(SongEntity, dataSource.manager);
    this.songMapper = new SongsMapper();
  }
  async findOrmEntityById(id: string): Promise<SongEntity> {
    return this.findOneBy({ id });
  }
  async findById(id: string): Promise<Song> {
    const songResponse = await this.createQueryBuilder('song')
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .leftJoinAndSelect('song_artist.artist', 'artist')
      .where('song.id = :id', { id: id })
      .getOne();

    const song: Song = (await this.songMapper.ToDomain(songResponse)) as Song;
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

    const songs: Promise<Song>[] = [];
    songsResponse.forEach((song) => songs.push(this.songMapper.ToDomain(song)));

    return await Promise.all(songs);
  }
  async findByPlaylistId(playlistId: string): Promise<Song[]> {
    const subquery = await this.createQueryBuilder('song')
      .innerJoin(
        'song.playlistSong',
        'playlistSong',
        'song.id = playlistSong.song',
      )
      .innerJoin('Playlists', 'p', 'p.id = playlistSong.playlist')
      .where('p.id = :playlistId', { playlistId })
      .select('song.id')
      .getMany();

    let values = [];
    subquery.forEach((sub) => values.push(sub.id));

    const songsResponse = await this.createQueryBuilder('song')
      .innerJoinAndSelect('song.song_artist', 'songArtist')
      .innerJoinAndSelect('songArtist.artist', 'artist')
      .where('song.id IN (:...values)', { values })
      .getMany();

    const songs: Promise<Song>[] = [];
    songsResponse.forEach((song) => songs.push(this.songMapper.ToDomain(song)));
    return await Promise.all(songs);
  }

  async findSongsInCollection(ids: string[]): Promise<Song[]> {
    const songsResponse = await this.createQueryBuilder('song')
      .where('song.id IN (:...ids)', { ids })
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .leftJoinAndSelect('song_artist.artist', 'artist')
      .getMany();

    const songs: Promise<Song>[] = [];
    songsResponse.forEach((song) => songs.push(this.songMapper.ToDomain(song)));

    return Promise.all(songs);
  }
}

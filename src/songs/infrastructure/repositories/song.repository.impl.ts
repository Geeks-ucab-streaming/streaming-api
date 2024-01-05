import { DataSource, EntityRepository, ILike, Repository } from 'typeorm';
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
  async saveStream(id: string) {
    const song = await this.findOne({ where: { id } });

    if (!song) {
      throw new Error(`La canción con ID ${id} no se encontró`);
    }
    song.reproductions += 1;

    await this.save(song);
  }
  async findTrendingSongs(): Promise<Song[]> {
    const songsResponse = await this.createQueryBuilder('song')
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .leftJoinAndSelect('song_artist.artist', 'artist')
      .orderBy('song.reproductions', 'DESC')
      .limit(4)
      .getMany();

    if (songsResponse) {
      const songs: Promise<Song>[] = [];
      songsResponse.forEach((song) =>
        songs.push(this.songMapper.ToDomain(song)),
      );
      return await Promise.all(songs);
    }
    return null;
  }

  async browseSongsName(
    query: string,
    limit: number,
    offset: number,
  ): Promise<Song[]> {
    const subquery = await this.createQueryBuilder('song')
      .innerJoin(
        'song.song_artist',
        'songArtist',
        'song.id = songArtist.songId',
      )
      .innerJoin('Artists', 'a', 'a.id = songArtist.artistId')
      .where('song.name ILIKE :query', { query: `%${query}%` })
      .orWhere('a.name ILIKE :query', { query: `%${query}%` })
      .select('song.id')
      .limit(limit)
      .skip(offset)
      .getMany();

    if (subquery) {
      let values = [];
      subquery.forEach((sub) => values.push(sub.id));

      if (values.length > 0) {
        const songsResponse = await this.createQueryBuilder('song')
          .leftJoinAndSelect('song.song_artist', 'song_artist')
          .leftJoinAndSelect('song_artist.artist', 'artist')
          .where('song.id IN (:...values)', { values })
          .getMany();
        const songs: Promise<Song>[] = [];
        if (songsResponse)
          songsResponse.forEach((song) =>
            songs.push(this.songMapper.ToDomain(song)),
          );
        return await Promise.all(songs);
      }
    }
    return null;
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

    if (songResponse) {
      let song: Song;
      song = (await this.songMapper.ToDomain(songResponse)) as Song;
      return song;
    }
    return null;
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

    if (subquery) {
      let values = [];
      subquery.forEach((sub) => values.push(sub.id));

      if (values.length > 0) {
        const songsResponse = await this.createQueryBuilder('song')
          .innerJoinAndSelect('song.song_artist', 'songArtist')
          .innerJoinAndSelect('songArtist.artist', 'artist')
          .where('song.id IN (:...values)', { values })
          .getMany();

        const songs: Promise<Song>[] = [];
        songsResponse.forEach((song) =>
          songs.push(this.songMapper.ToDomain(song)),
        );

        return await Promise.all(songs);
      }
    }
    return null;
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

    if (subquery) {
      let values = [];
      subquery.forEach((sub) => values.push(sub.id));
      if (values) {
        const songsResponse = await this.createQueryBuilder('song')
          .innerJoinAndSelect('song.song_artist', 'songArtist')
          .innerJoinAndSelect('songArtist.artist', 'artist')
          .where('song.id IN (:...values)', { values })
          .getMany();

        const songs: Promise<Song>[] = [];
        songsResponse.forEach((song) =>
          songs.push(this.songMapper.ToDomain(song)),
        );
        return await Promise.all(songs);
      }
    }
    return null;
  }

  async findSongsInCollection(ids: string[]): Promise<Song[]> {
    const songsResponse = await this.createQueryBuilder('song')
      .where('song.id IN (:...ids)', { ids })
      .leftJoinAndSelect('song.song_artist', 'song_artist')
      .leftJoinAndSelect('song_artist.artist', 'artist')
      .getMany();

    if (songsResponse) {
      const songs: Promise<Song>[] = [];
      songsResponse.forEach((song) =>
        songs.push(this.songMapper.ToDomain(song)),
      );

      return Promise.all(songs);
    }
    return null;
  }
}

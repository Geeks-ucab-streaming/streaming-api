import { Repository, DataSource } from 'typeorm';
import { IPlaylistRepository } from '../domain/IPlaylistRepository';
import { Playlist } from '../domain/playlist';
import { PlaylistEntity } from './entities/playlist.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { PlaylistMapper } from './mappers/playlist.mapper';

export class PlaylistRepository
  extends Repository<PlaylistEntity>
  implements IPlaylistRepository
{
  private readonly playlistMapper: PlaylistMapper;

  constructor(dataSource: DataSource) {
    super(PlaylistEntity, dataSource.manager);
    this.playlistMapper = new PlaylistMapper();
  }
  async findTopPlaylists(): Promise<Playlist[]> {
    let playlists: Playlist[] = [];
    const playlistsResponse: PlaylistEntity[] = await this.createQueryBuilder(
      'playlist',
    )
      .leftJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .leftJoinAndSelect('playlistSong.song', 'song')
      .where('playlist.isAlbum = :isAlbum', { isAlbum: false })
      .orderBy('playlist.reproductions')
      .getMany();

    console.log(playlistsResponse);

    for (const playlist of playlistsResponse) {
      playlists.push(await this.playlistMapper.ToDomain(playlist));
    }
    return playlists;
  }

  async findTopAlbums(): Promise<Playlist[]> {
    let playlists: Playlist[] = [];
    const playlistsResponse: PlaylistEntity[] = await this.createQueryBuilder(
      'playlist',
    )
      .leftJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .leftJoinAndSelect('playlistSong.song', 'song')
      .leftJoinAndSelect('playlist.playlistCreator', 'creators')
      .where('playlist.isAlbum = :isAlbum', { isAlbum: true })
      .orderBy('playlist.reproductions')
      .getMany();

    for (const playlist of playlistsResponse) {
      playlists.push(await this.playlistMapper.ToDomain(playlist));
    }
    return playlists;
  }

  async findPlaylistById(id: string): Promise<Playlist> {
    const playlistResponse: PlaylistEntity = await this.createQueryBuilder(
      'playlist',
    )
      .leftJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .leftJoinAndSelect('playlistCreator.artist', 'artist')
      .leftJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .leftJoinAndSelect('playlistSong.song', 'song')
      .leftJoinAndSelect('song.song_artist', 'songArtist')
      .leftJoinAndSelect('songArtist.artist', 'artist2')
      .where('playlist.id = :playlistId', { playlistId: id })
      .getOne();

    const playlist = await this.playlistMapper.ToDomain(playlistResponse);
    return playlist;
  }
  findPlaylistsByArtistId(id: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
  }
}

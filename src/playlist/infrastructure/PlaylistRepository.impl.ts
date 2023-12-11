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
  findTopPlaylists(): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
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

    console.log(playlistResponse);

    const playlist = await this.playlistMapper.ToDomain(playlistResponse);
    return playlist;
  }
  findPlaylistsByArtistId(id: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
  }
}

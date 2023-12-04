import { Repository, DataSource } from 'typeorm';
import { IPlaylistRepository } from '../domain/IPlaylistRepository';
import { Playlist } from '../domain/playlist';
import { PlaylistEntity } from './entities/playlist.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { PlaylistRequestMapper } from './mappers/playlistRequest.mapper';

export class PlaylistRepository
  extends Repository<PlaylistEntity>
  implements IPlaylistRepository
{
  private readonly getFileService: GetFileService;
  private readonly playlistMapper: PlaylistRequestMapper;

  constructor(dataSource: DataSource, getFileService: GetFileService) {
    super(PlaylistEntity, dataSource.manager);
    this.getFileService = getFileService;
    this.playlistMapper = new PlaylistRequestMapper();
  }

  async findPlaylistById(id: string): Promise<Playlist> {
    const playlistResponse: PlaylistEntity = await this.createQueryBuilder(
      'playlist',
    )
      .innerJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .innerJoinAndSelect('playlistCreator.artist', 'artist')
      .innerJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .innerJoinAndSelect('playlistSong.song', 'song')
      .innerJoinAndSelect('song.song_artist', 'songArtist')
      .innerJoinAndSelect('songArtist.artist', 'artist2')
      .where('playlist.id = :playlistId', { playlistId: id })
      .getOne();

    console.log(playlistResponse);

    const playlist = this.playlistMapper.ToDomain(playlistResponse);
    return playlist;
  }
  findPlaylistsByArtistId(id: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
  }
}

import { Repository, DataSource } from 'typeorm';
import { IPlaylistRepository } from '../domain/IPlaylistRepository';
import { Playlist } from '../domain/playlist';
import { PlaylistEntity } from './entities/playlist.entity';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

export class PlaylistRepository
  extends Repository<PlaylistEntity>
  implements IPlaylistRepository
{
  private readonly getFileService: GetFileService;

  constructor(dataSource: DataSource, getFileService: GetFileService) {
    super(PlaylistEntity, dataSource.manager);
    this.getFileService = getFileService;
  }

  async findPlaylistById(id: string): Promise<Playlist> {
    const playlist: PlaylistEntity[] = await this.createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .innerJoinAndSelect('playlistCreator.artist', 'artist')
      .innerJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .innerJoinAndSelect('playlistSong.song', 'song')
      .where('playlist.id = :playlistId', { playlistId: id })
      .getMany();

    console.log('---------------------------------------------------');
    console.log(playlist[0].playlistCreator[0]);

    // const album: Playlist = Array.isArray(playlist) ? playlist[0] : playlist;
    // if (!album) {
    //   throw new Error('Album not found');
    // }

    console.log(playlist[0].id);

    const playlistWithImage: Playlist = new Playlist(
      playlist[0].id,
      playlist[0].name,
      playlist[0].duration,
      playlist[0].image_reference,
      playlist[0].reproductions,
    );

    playlistWithImage.playlistCreator =
      playlist[0].playlistCreator[0].artist[0];
    for (const song of playlist[0].playlistSong) {
      playlistWithImage.playlistSong.push(song[0]);
    }
    playlistWithImage.playlist_Image = await this.getFileService.execute(
      playlist[0].image_reference,
    );

    console.log(playlistWithImage);

    return playlistWithImage;
  }
  findPlaylistsByArtistId(id: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
  }
}

import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { Playlist } from '../../domain/playlist';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from '../entities/playlist.entity';
import { Repository } from 'typeorm';

export class FindAlbumByPlaylistIDRepository
  implements IFindGenericRepository<Playlist>
{
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly repository: Repository<Playlist>,
  ) {}

  async find(playlistId: string): Promise<Playlist[]> {
    const subquery = await this.repository
      .createQueryBuilder('playlist')
      .innerJoin('playlist.playlistSong', 'ps', 'playlist.id = ps.playlist')
      .where('playlist.id = :playlistId', { playlistId: playlistId })
      .select('ps.song')
      .getMany();

    let values = [];
    subquery.forEach((sub) => values.push(sub.id));

    console.log(values);

    const playlists = await this.repository
      .createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .innerJoinAndSelect('playlistCreator.artist', 'artist')
      .innerJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .innerJoinAndSelect('playlistSong.song', 'song')
      .innerJoinAndSelect('song.song_artist', 'song_artist')
      .innerJoinAndSelect('song_artist.artist', 'songArtist')
      .where('playlist.id = :playlistId', { playlistId })
      .getMany();
    return playlists;
  }
}

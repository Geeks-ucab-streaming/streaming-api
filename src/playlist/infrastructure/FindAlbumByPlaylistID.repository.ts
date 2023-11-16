import { IFindGenericRepository } from "src/common/domain/ifindgeneric.repository";
import { Playlist } from "../domain/playlist";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistEntity } from "./entities/playlist.entity";
import { Repository } from "typeorm";

export class FindAlbumByPlaylistIDRepository
  implements IFindGenericRepository<Playlist>
{
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly repository: Repository<Playlist>,
  ) {}

  async find(playlistId: string): Promise<Playlist[]> {
    const playlists = await this.repository
      .createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .innerJoinAndSelect('playlistCreator.artist', 'artist')
      .innerJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .innerJoinAndSelect('playlistSong.song', 'song')
      .where('playlist.id = :playlistId', { playlistId })
      .getMany();
    return playlists;
  }
}
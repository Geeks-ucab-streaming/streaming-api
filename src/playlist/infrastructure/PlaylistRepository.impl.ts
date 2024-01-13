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
  async browsePlaylists(
    query: string,
    album: boolean,
    limit: number,
    offset: number,
  ): Promise<Playlist[]> {
    const playlistsResponse = await this.createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .leftJoinAndSelect('playlistCreator.artist', 'artist')
      .leftJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .leftJoinAndSelect('playlistSong.song', 'song')
      .where('(playlist.name ILIKE :query OR artist.name ILIKE :query)', {
        query: `%${query}%`,
      })
      .andWhere('playlist.isAlbum = :isAlbum', { isAlbum: album })
      .limit(limit)
      .offset(offset)
      .getMany();

    console.log(playlistsResponse);
    console.log('AQUI');

    if (playlistsResponse) {
      let playlists: Playlist[] = [];
      if (playlistsResponse.length > 0)
        for (const playlist of playlistsResponse) {
          playlists.push(await this.playlistMapper.ToDomain(playlist));
        }
      console.log(playlists);
      return playlists;
    }
    return null;
  }
  async saveStream(id: string): Promise<boolean> {
    const playlist = await this.findOne({ where: { id } });

    if (playlist) {
      playlist.reproductions += 1;

      const res = await this.save(playlist);
      if (res) return true;
    }
    return false;
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

    if (playlistsResponse) {
      for (const playlist of playlistsResponse) {
        playlists.push(await this.playlistMapper.ToDomain(playlist));
      }
      return playlists;
    }
    return null;
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

    if (playlistsResponse) {
      for (const playlist of playlistsResponse) {
        playlists.push(await this.playlistMapper.ToDomain(playlist));
      }
      return playlists;
    }
    return null;
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

    if (playlistResponse) {
      const playlist = await this.playlistMapper.ToDomain(playlistResponse);
      return playlist;
    }
    return null;
  }

  async findAlbumById(id: string): Promise<Playlist> {
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
      .andWhere('playlist.isAlbum = :isAlbum', { isAlbum: true })
      .getOne();

    if (playlistResponse) {
      const playlist = await this.playlistMapper.ToDomain(playlistResponse);
      return playlist;
    }
    return null;
  }
  async findPlaylistsByArtistId(id: string): Promise<Playlist[]> {
    const playlistsResponse: PlaylistEntity[] = await this.createQueryBuilder(
      'playlist',
    )
      .leftJoinAndSelect('playlist.playlistCreator', 'playlistCreator')
      .leftJoinAndSelect('playlistCreator.artist', 'artist')
      .leftJoinAndSelect('playlist.playlistSong', 'playlistSong')
      .leftJoinAndSelect('playlistSong.song', 'song')
      .leftJoinAndSelect('song.song_artist', 'songArtist')
      .leftJoinAndSelect('songArtist.artist', 'artist2')
      .where('artist.id = :artistId', { artistId: id })
      .getMany();

    if (playlistsResponse) {
      let playlists: Playlist[] = [];
      for (const playlist of playlistsResponse) {
        playlists.push(await this.playlistMapper.ToDomain(playlist));
      }
      return playlists;
    }
    return null;
  }
}

import { Imapper } from 'src/core/application/IMapper';
import { Song } from 'src/songs/domain/song';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistEntity } from '../entities/playlist.entity';
import { ArtistsMapper } from 'src/artists/infrastructure/mappers/artist.mapper';
import { SongsMapper } from '../../../songs/infrastructure/mappers/Song.mapper';

export class PlaylistRequestMapper
  implements Imapper<Playlist, PlaylistEntity>
{
  private readonly getSongImageService: GetFileService;
  private readonly artistMapper: ArtistsMapper;
  private readonly songsMapper: SongsMapper;

  constructor() {
    this.getSongImageService = new GetFileService(
      process.env.SONG_ALBUM_PLAYLIST_CONTAINER,
    );
    this.artistMapper = new ArtistsMapper();
    this.songsMapper = new SongsMapper();
  }
  async ToDomain(ormEntity: PlaylistEntity): Promise<Playlist> {
    let playlist = new Playlist(
      ormEntity.id,
      ormEntity.name,
      ormEntity.duration,
      ormEntity.image_reference,
      ormEntity.reproductions,
    );

    for (const artist of ormEntity.playlistCreator) {
      playlist.playlistCreator.push(
        await this.artistMapper.ToDomain(artist.artist),
      );
    }
    console.log('aqui');
    console.log(playlist);
    console.log(ormEntity.playlistSong[0].song);
    for (const song of ormEntity.playlistSong) {
      playlist.playlistSong.push(await this.songsMapper.ToDomain(song.song));
    }

    return playlist;
  }

  domainTo(domainEntity: Playlist): Promise<PlaylistEntity> {
    throw new Error('Method not implemented.');
  }
}

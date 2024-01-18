import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { DataSourceSingleton } from './dataSourceSingleton';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Result } from '../domain/logic/Result';
import { LoggingApplicationServiceDecorator } from '../Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from './logger/nest-logger';
import { BrowseSongsService } from 'src/songs/application/services/browseSongs.service';
import { Song } from 'src/songs/domain/song';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import { BrowseArtistService } from 'src/artists/application/services/browseArtists.service';
import { BrowseAlbumPlaylistService } from 'src/playlist/application/services/BrowseAlbumPlaylist.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { MyResponse } from './Response';
import { PaginationDto } from './Dtos/pagination.dto';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongDto } from 'src/songs/infrastructure/dtos/Song.dto';

export class QueryDto {
  artists?: { id: string; name: string; image: Buffer }[];
  songs?: SongDto[];
  playlists?: { id: string; name: string; image: Buffer }[];
  albums?: { id: string; name: string; image: Buffer }[];
}

@Controller('api/search')
export class CommonController {
  private readonly ormSongRepository: OrmSongRepository;
  private readonly ormArtistRepository: OrmArtistRepository;
  private readonly ormPlaylistRepository: PlaylistRepository;
  // private readonly findSongsByArtistIdService: FindSongsByPlaylistIdService;
  constructor() {
    this.ormSongRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormArtistRepository = new OrmArtistRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormPlaylistRepository = new PlaylistRepository(
      DataSourceSingleton.getInstance(),
    );
  }

  @ApiTags('Browser')
  @Get('/:query')
  async find(@Param('query') query: string): Promise<MyResponse<QueryDto>> {
    const browseSongsService = new LoggingApplicationServiceDecorator(
      new BrowseSongsService(this.ormSongRepository),
      new NestLogger(),
    );
    const browseArtistsService = new LoggingApplicationServiceDecorator(
      new BrowseArtistService(this.ormArtistRepository),
      new NestLogger(),
    );
    const getArtistservice = new LoggingApplicationServiceDecorator(
      new GetArtistProfilesApplicationService(this.ormArtistRepository),
      new NestLogger(),
    );
    const browsePlaylistsService = new LoggingApplicationServiceDecorator(
      new BrowseAlbumPlaylistService(
        this.ormPlaylistRepository,
        this.ormSongRepository,
      ),
      new NestLogger(),
    );
    const songsResult: Result<Song[]> = await browseSongsService.execute(query);
    const artistsResult: Result<Artist[]> =
      await browseArtistsService.execute(query);
    const playlistsResult: Result<Playlist[]> =
      await browsePlaylistsService.execute({ query, album: false });
    const albumsResult: Result<Playlist[]> =
      await browsePlaylistsService.execute({ query, album: true });

    const queryResult: QueryDto = {
      songs: [],
      artists: [],
      playlists: [],
      albums: [],
    };
    if (songsResult.IsSuccess) {
      if (songsResult.Value) {
        for (const song of songsResult.Value) {
          let artistsAux: { id: string; name: string }[] = [];
          for (const artist of song.Artists) {
            const dtoArtist = ArtistID.create(artist);
            const dto: GetArtistProfilesApplicationServiceDto = {
              id: dtoArtist,
            };
            const artistResult: Result<Artist> =
              await getArtistservice.execute(dto);
            artistsAux.push({
              id: artistResult.Value.Id.Value,
              name: artistResult.Value.Name.Value,
            });
          }
          queryResult.songs.push({
            id: song.Id.Value,
            name: song.Name,
            duration: song.DurationString,
            image: song.Image,
            artists: artistsAux,
          });
        }
      }
      if (artistsResult.IsSuccess) {
        if (artistsResult.Value) {
          for (const artist of artistsResult.Value) {
            queryResult.artists.push({
              id: artist.Id.Value,
              name: artist.Name.Value,
              image: artist.Image,
            });
          }
        }
        if (playlistsResult.IsSuccess) {
          if (playlistsResult.Value) {
            for (const playlist of playlistsResult.Value) {
              queryResult.playlists.push({
                id: playlist.Id.Value,
                name: playlist.Name,
                image: playlist.Playlist_Image,
              });
            }
          }
        } else throw new Error(playlistsResult.Error.message);
        if (albumsResult.IsSuccess) {
          if (albumsResult.Value) {
            for (const album of albumsResult.Value) {
              queryResult.albums.push({
                id: album.Id.Value,
                name: album.Name,
                image: album.Playlist_Image,
              });
            }
          }
        }
      }
    }
    if (
      queryResult.albums.length > 0 ||
      queryResult.artists.length > 0 ||
      queryResult.songs.length > 0 ||
      queryResult.playlists.length > 0
    )
      return MyResponse.success(queryResult);
    MyResponse.fail(
      404,
      'No se encontró ningún resultado',
      'Not Found Exception',
    );
  }
}

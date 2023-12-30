import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { DataSourceSingleton } from './dataSourceSingleton';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Result } from '../domain/logic/Result';
import { PlaylistDto, SongDto } from 'src/dtos';
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

export class QueryDto {
  artists?: { id: string; name: string; image: Buffer }[];
  songs?: SongDto[];
}

@Controller('api/browser')
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
  async find(@Param('query') query: string): Promise<QueryDto> {
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
    const songsResult: Result<Song[]> = await browseSongsService.execute(query);
    const artistsResult: Result<Artist[]> =
      await browseArtistsService.execute(query);

    if (songsResult.IsSuccess) {
      const queryResult: QueryDto = { songs: [], artists: [] };
      for (const song of songsResult.Value) {
        let artistsAux: { id: string; name: string }[] = [];
        for (const artist of song.Artists) {
          const dto: GetArtistProfilesApplicationServiceDto = {
            id: artist,
          };
          const artistResult: Result<Artist> =
            await getArtistservice.execute(dto);
          artistsAux.push({
            id: artistResult.Value.Id.Value,
            name: artistResult.Value.Name.Value,
          });
        }
        queryResult.songs.push({
          songId: song.Id.Value,
          name: song.Name,
          duration: song.DurationString,
          image: song.Image,
          artists: artistsAux,
        });
      }
      if (artistsResult.IsSuccess) {
        for (const artist of artistsResult.Value) {
          queryResult.artists.push({
            id: artist.Id.Value,
            name: artist.Name.Value,
            image: artist.Image,
          });
        }
        return queryResult;
      } else throw new Error(artistsResult.Error.message);
    } else throw new Error(songsResult.Error.message);
  }
}

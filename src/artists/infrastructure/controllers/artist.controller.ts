// import { Controller, Get, Inject, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
// import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
// import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
// import { Artist } from 'src/artists/domain/artist';

import { Controller, Get, Param } from '@nestjs/common';
import { OrmArtistRepository } from '../repositories/artist.repository.impl';
import { Result } from 'src/common/domain/logic/Result';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import { ArtistsMapper } from '../mappers/artist.mapper';
import { ErrorApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { GetAllArtistsApplicationService } from 'src/artists/application/services/get-all-artists.application.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTrendingArtistsService } from 'src/artists/application/services/FindTrendingArtists.service';
import { AllArtistInfoDto, TrendingArtistsDto } from 'src/dtos';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { Song } from 'src/songs/domain/song';
import { FindSongsByArtistIdService } from 'src/songs/application/services/getSongsByArtist.service';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
@Controller('api/artists')
export class ArtistController {
  private readonly ormArtistRepository: OrmArtistRepository;
  private readonly ormSongsRepository: OrmSongRepository;
  private readonly ormPlaylistRepository: PlaylistRepository;

  constructor() {
    this.ormArtistRepository = new OrmArtistRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormSongsRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormPlaylistRepository = new PlaylistRepository(
      DataSourceSingleton.getInstance(),
    );
  }

  @ApiTags('ArtistTrending')
  @Get('/top_artists')
  async getArtistTrending(): Promise<Result<TrendingArtistsDto>> {
    const service = new ErrorApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetTrendingArtistsService(this.ormArtistRepository),
        new NestLogger(),
      ),
    );

    const result = await service.execute();
    if (result.IsSuccess) {
      let trendingArtists: TrendingArtistsDto = { artists: [] };
      for (const artist of result.Value) {
        trendingArtists.artists.push({
          id: artist.Id.Value,
          name: artist.Name.Value,
          image: artist.Image,
        });
      }
      console.log(result);
      return Result.success<TrendingArtistsDto>(trendingArtists);
    } else throw Error(result.Error.message);
  }

  @ApiTags('Artist')
  @Get()
  async findAll(): Promise<Result<Artist[]>> {
    //Creamos el servicio de aplicación.
    const service = new ErrorApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetAllArtistsApplicationService(this.ormArtistRepository),
        new NestLogger(),
      ),
    );
    const result = await service.execute();
    return result;
  }
  @ApiTags('Artist')
  @Get('/:ArtistId')
  async getArtist(@Param('ArtistId') id): Promise<Result<AllArtistInfoDto>> {
    const dto: GetArtistProfilesApplicationServiceDto = { id };
    // const service=new GetArtistProfilesApplicationServiceDto(this.ormArtistRepository);
    //Mapeamos y retornamos.

    //Ejecutamos el caso de uso
    //Creamos el servicio de aplicación.
    const service = new LoggingApplicationServiceDecorator(
      new GetArtistProfilesApplicationService(this.ormArtistRepository),
      new NestLogger(),
    );
    const getSongsByArtistIdservice = new ErrorApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new FindSongsByArtistIdService(this.ormSongsRepository),
        new NestLogger(),
      ),
    );
    const getAlbumsByArtistIdservice = new ErrorApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new FindAlbumByArtistIDService(
          this.ormPlaylistRepository,
          this.ormSongsRepository,
        ),
        new NestLogger(),
      ),
    );
    const result = await service.execute(dto);

    if (result.IsSuccess) {
      const artistSongsResponse: Result<Song[]> =
        await getSongsByArtistIdservice.execute(result.Value.Id.Value);
      if (artistSongsResponse.IsSuccess) {
        const artistAlbumsResponse: Result<Playlist[]> =
          await getAlbumsByArtistIdservice.execute(result.Value.Id.Value);
        if (artistAlbumsResponse.IsSuccess) {
          let allArtistInfo: AllArtistInfoDto = {
            id: '',
            name: '',
            image: null,
            albums: [],
            songs: [],
          };

          allArtistInfo.id = result.Value.Id.Value;
          allArtistInfo.name = result.Value.Id.Value;
          allArtistInfo.image = result.Value.Image;
          if (artistAlbumsResponse.Value.length >= 1) {
            for (const album of artistAlbumsResponse.Value) {
              allArtistInfo.albums.push({
                id: album.Id.Value,
                image: album.Playlist_Image,
              });
            }
          }
          if (artistSongsResponse.Value.length >= 1) {
            for (const song of artistSongsResponse.Value) {
              let artistsAux: { id: string; name: string }[] = [];
              for (const artist of song.Artists) {
                if (artist === result.Value.Id.Value) {
                  artistsAux.push({
                    id: result.Value.Id.Value,
                    name: result.Value.Name.Value,
                  });
                } else {
                  const dto: GetArtistProfilesApplicationServiceDto = {
                    id: artist,
                  };
                  const otherArtist: Result<Artist> =
                    await service.execute(dto);
                  artistsAux.push({
                    id: otherArtist.Value.Id.Value,
                    name: otherArtist.Value.Name.Value,
                  });
                }
              }
              allArtistInfo.songs.push({
                id: song.Id.Value,
                duration: song.DurationString,
                image: song.Image,
                artists: artistsAux,
              });
            }
          }
          return Result.success<AllArtistInfoDto>(allArtistInfo);
        } else throw new Error(artistAlbumsResponse.Error.message);
      } else throw new Error(artistSongsResponse.Error.message);
    } else throw new Error(result.Error.message);
  }
}

//   private findOneArtistService: FindOneArtistService;
//   private findAllArtistService: FindAllArtistService;
//   private findSongsByArtistIdService: GetSongByArtistId;
//   private readonly ormSongRepository: OrmArtistRepository;
//   constructor() {}

//   @Get()
//   async findAll(): Promise<Artist[]> {
//     return await this.findAllArtistService.execute();
//   }
//   @ApiTags('Artist')
//   @Get('/:id')
//   findById(@Param('id') id: string): Promise<Artist> {
//     return this.findOneArtistService.execute(id);
//   }
//   @ApiTags('Artist')
//   @Get('/ArtistsSongsByArtistId/:id')
//   findSongsById(@Param('id') id: string): Promise<any> {
//     return this.findSongsByArtistIdService.execute(id);
//   }
// }

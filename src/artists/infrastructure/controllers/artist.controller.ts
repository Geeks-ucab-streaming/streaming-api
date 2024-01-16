// import { Controller, Get, Inject, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
// import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
// import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
// import { Artist } from 'src/artists/domain/artist';

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrmArtistRepository } from '../repositories/artist.repository.impl';
import { Result } from 'src/common/domain/logic/Result';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import { ErrorApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { GetAllArtistsApplicationService } from 'src/artists/application/services/get-all-artists.application.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTrendingArtistsService } from 'src/artists/application/services/FindTrendingArtists.service';
import { AllArtistInfoDto, TrendingArtistsDto } from 'src/dtos';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { Song } from 'src/songs/domain/song';
import {
  FindSongsByArtistIdService,
  FindSongsByArtistIdServiceDto,
} from 'src/songs/application/services/getSongsByArtist.service';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import {
  FindAlbumByArtistIDService,
  FindAlbumByArtistIDServiceDto,
} from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { GetArtistGenre } from 'src/artists/domain/services/getArtistGenreDomain.service';
import { MyResponse } from 'src/common/infrastructure/Response';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { AudithApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/audith.service.decorator';
import { AudithRepositoryImpl } from 'src/common/infrastructure/repositories/audithRepository.impl';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';
@ApiBearerAuth()
@Controller('api/artist')
export class ArtistController {
  private readonly ormArtistRepository: OrmArtistRepository;
  private readonly ormSongsRepository: OrmSongRepository;
  private readonly ormPlaylistRepository: PlaylistRepository;
  private audithRepo: AudithRepositoryImpl;
  private jwtService: JwtService = new JwtService();

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
    this.audithRepo = new AudithRepositoryImpl();
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('ArtistTrending')
  @Get('/top_artists')
  async getArtistTrending(
    @Req() req: Request,
  ): Promise<MyResponse<TrendingArtistsDto>> {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const userid = await this.jwtService.decode(token).id;
    const dto = GetTrendingArtistsService;
    const service = new AudithApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetTrendingArtistsService(this.ormArtistRepository),
        new NestLogger(),
      ),
      this.audithRepo,
      userid,
    );

    const result = await service.execute(dto);
    if (result.IsSuccess) {
      let trendingArtists: TrendingArtistsDto = { artists: [] };
      for (const artist of result.Value) {
        trendingArtists.artists.push({
          id: artist.Id.Value,
          name: artist.Name.Value,
          image: artist.Image,
        });
      }
      return MyResponse.success(trendingArtists);
    }
    MyResponse.fail(result.statusCode, result.message, result.error);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Artist')
  @Get()
  async findAll(@Req() req: Request): Promise<MyResponse<Artist[]>> {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const userid = await this.jwtService.decode(token).id;
    //Creamos el servicio de aplicación.
    const dto = GetAllArtistsApplicationService;
    const service = new AudithApplicationServiceDecorator(
      new GetAllArtistsApplicationService(this.ormArtistRepository),
      this.audithRepo,
      userid,
    );

    // const service = new ErrorApplicationServiceDecorator(
    //   new LoggingApplicationServiceDecorator(
    //     new GetAllArtistsApplicationService(this.ormArtistRepository),
    //     new NestLogger(),
    //   ),
    // );
    const result = await service.execute(dto);
    return MyResponse.fromResult(result);
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('Artist')
  @Get('/:ArtistId')
  async getArtist(
    @Param('ArtistId') id: string,
    @Req() req: Request,
  ): Promise<MyResponse<AllArtistInfoDto>> {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const userid = await this.jwtService.decode(token).id;
    const iddto = ArtistID.create(id);
    const dto: GetArtistProfilesApplicationServiceDto = { id: iddto };
    // const service=new GetArtistProfilesApplicationServiceDto(this.ormArtistRepository);
    //Mapeamos y retornamos.

    //Ejecutamos el caso de uso
    //Creamos el servicio de aplicación.
    const service = new AudithApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetArtistProfilesApplicationService(this.ormArtistRepository),
        new NestLogger(),
      ),
      this.audithRepo,
      userid,
    );
    // const service = new LoggingApplicationServiceDecorator(
    //   new GetArtistProfilesApplicationService(this.ormArtistRepository),
    //   new NestLogger(),
    // );
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

    const getArtistGenre: GetArtistGenre = GetArtistGenre.getInstance();

    const result = await service.execute(dto);

    if (result.IsSuccess) {
      const getSongByArtistIdDto: FindSongsByArtistIdServiceDto = {
        id: result.Value.Id,
      };
      const artistSongsResponse: Result<Song[]> =
        await getSongsByArtistIdservice.execute(getSongByArtistIdDto);
      if (artistSongsResponse.IsSuccess) {
        const getAlbumsByArtistIdServiceDto: FindAlbumByArtistIDServiceDto = {
          id: result.Value.Id,
        };
        const artistAlbumsResponse: Result<Playlist[]> =
          await getAlbumsByArtistIdservice.execute(
            getAlbumsByArtistIdServiceDto,
          );
        if (artistAlbumsResponse.IsSuccess) {
          let allArtistInfo: AllArtistInfoDto = {
            id: '',
            name: '',
            genre: '',
            image: null,
            albums: [],
            songs: [],
          };

          const genre = getArtistGenre.execute(artistSongsResponse.Value);

          allArtistInfo.id = result.Value.Id.Value;
          allArtistInfo.name = result.Value.Name.Value;
          allArtistInfo.image = result.Value.Image;
          allArtistInfo.genre = genre;
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
                  const dtoArtist = ArtistID.create(artist);
                  const dto: GetArtistProfilesApplicationServiceDto = {
                    id: dtoArtist,
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
                name: song.Name,
                duration: song.DurationString,
                image: song.Image,
                artists: artistsAux,
              });
            }
          }
          return MyResponse.success(allArtistInfo);
        } else
          MyResponse.fail(
            artistAlbumsResponse.statusCode,
            artistAlbumsResponse.message,
            artistAlbumsResponse.error,
          );
      } else
        MyResponse.fail(
          artistSongsResponse.statusCode,
          artistSongsResponse.message,
          artistSongsResponse.error,
        );
    } else MyResponse.fail(result.statusCode, result.message, result.error);
  }
}

import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import {
  FindSongsByArtistIdService,
  FindSongsByArtistIdServiceDto,
} from '../../application/services/getSongsByArtist.service';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetSongBPlaylistIdService,
  GetSongBPlaylistIdServiceDto,
} from 'src/songs/application/services/getSongsByPlaylistId.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { Result } from 'src/common/domain/logic/Result';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { GetTrendingSongsService } from 'src/songs/application/services/getTrendingSongs.service';
import { SongDto } from 'src/dtos';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import {
  AddStreamToSongService,
  StreamDto,
} from 'src/songs/application/services/addStreamtoSong.service';
import { StreamRepository } from 'src/common/infrastructure/repositories/streamsRepository.impl';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import { IPlaylistStreamRepository } from 'src/common/domain/repositories/IPlaylistStreamRepository';
import { PlaylistStreamsRepository } from 'src/common/infrastructure/repositories/playlistStreamsRepository.impl';
import { MyResponse } from 'src/common/infrastructure/Response';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { PlaylistID } from 'src/playlist/domain/value-objects/PlaylistID-valueobject';
import { JwtAuthGuard } from 'src/users/application/jwtoken/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AudithApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/audith.service.decorator';
import { AudithRepositoryImpl } from 'src/common/infrastructure/repositories/audithRepository.impl';
import { StreamInfoDto } from '../stream.dto';

export class TrendingSongsDto {
  songs: SongDto[];
}

@Controller('api/song')
export class SongsController {
  private audithRepo: AudithRepositoryImpl;
  private jwtService: JwtService = new JwtService();
  private getSongByIdService: GetSongByIdService;
  private getSongBPlaylistIdService: GetSongBPlaylistIdService;
  private findSongsByArtistIdService: FindSongsByArtistIdService;
  private readonly ormSongRepository: OrmSongRepository;
  private readonly ormArtistRepository: OrmArtistRepository;
  // private readonly findSongsByArtistIdService: FindSongsByPlaylistIdService;
  constructor() {
    this.ormSongRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormArtistRepository = new OrmArtistRepository(
      DataSourceSingleton.getInstance(),
    );
    this.audithRepo = new AudithRepositoryImpl();
  }

  @ApiTags('Trending Songs')
  @Get('/top_songs')
  async findTrendingSongs(): Promise<MyResponse<TrendingSongsDto>> {
    const service = new LoggingApplicationServiceDecorator(
      new GetTrendingSongsService(this.ormSongRepository),
      new NestLogger(),
    );
    const findArtistByIdService = new LoggingApplicationServiceDecorator(
      new GetArtistProfilesApplicationService(this.ormArtistRepository),
      new NestLogger(),
    );
    const songsResponse: Result<Song[]> = await service.execute();
    if (songsResponse.IsSuccess) {
      let TrendingSongs: TrendingSongsDto = { songs: [] };
      for (const song of songsResponse.Value) {
        let artistsAux: { id: string; name: string }[] = [];
        for (const artist of song.Artists) {
          let dtoArtist: ArtistID;
          dtoArtist = ArtistID.create(artist);
          const dto: GetArtistProfilesApplicationServiceDto = {
            id: dtoArtist,
          };
          const artistResponse: Result<Artist> =
            await findArtistByIdService.execute(dto);
          if (artistResponse.IsSuccess) {
            artistsAux.push({
              id: artistResponse.Value.Id.Value,
              name: artistResponse.Value.Name.Value,
            });
          }
        }
        TrendingSongs.songs.push({
          id: song.Id.Value,
          name: song.Name,
          image: song.Image,
          duration: song.DurationString,
          artists: artistsAux,
        });
      }
      return MyResponse.success(TrendingSongs);
    } else
      MyResponse.fail(
        songsResponse.statusCode,
        songsResponse.message,
        songsResponse.error,
      );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Songs')
  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<MyResponse<Song>> {
    const token = req.headers['authorization']?.split(' ')[1] ?? '';
    const userid = await this.jwtService.decode(token).id;
    const dto: GetSongByIdServiceDto = { id: SongID.create(id) };
    const service = new AudithApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetSongByIdService(this.ormSongRepository),
        new NestLogger(),
      ),
      this.audithRepo,
      userid,
    );
    const result = await service.execute(dto);
    return MyResponse.fromResult(result);
  }

  @ApiTags('Songs')
  @Get('/artist/:artistId')
  async findByArtistId(
    @Param('artistId', ParseUUIDPipe) id: string,
  ): Promise<MyResponse<Song[]>> {
    const dto: FindSongsByArtistIdServiceDto = { id: ArtistID.create(id) };
    this.findSongsByArtistIdService = new FindSongsByArtistIdService(
      this.ormSongRepository,
    );
    const result = await this.findSongsByArtistIdService.execute(dto);
    return MyResponse.fromResult(result);
  }
  @ApiTags('Songs')
  @Get('/playlist/:playlistId')
  async findByPlaylistId(
    @Param('playlistId', ParseUUIDPipe) id: string,
  ): Promise<MyResponse<Song[]>> {
    this.getSongBPlaylistIdService = new GetSongBPlaylistIdService(
      this.ormSongRepository,
    );
    const getSongsByPlaylistIdDto: GetSongBPlaylistIdServiceDto = {
      id: PlaylistID.create(id),
    };
    const result = await this.getSongBPlaylistIdService.execute(
      getSongsByPlaylistIdDto,
    );
    return MyResponse.fromResult(result);
  }

  @ApiTags('StreamedSong')
  @Post('/streamedsong')
  addStreamToSong(@Query() streamDto: StreamInfoDto): void {
    const streamAppDto: StreamDto = {
      user: userId.create(streamDto.user),
      song: SongID.create(streamDto.song),
      playlist: streamDto.playlist
        ? PlaylistID.create(streamDto.playlist)
        : null,
    };
    const streamRepository: StreamRepository = new StreamRepository(
      DataSourceSingleton.getInstance(),
    );
    const playlistStreamRepository: IPlaylistStreamRepository =
      new PlaylistStreamsRepository(DataSourceSingleton.getInstance());
    const playlistRepository: PlaylistRepository = new PlaylistRepository(
      DataSourceSingleton.getInstance(),
    );
    const service = new LoggingApplicationServiceDecorator(
      new AddStreamToSongService(
        streamRepository,
        playlistStreamRepository,
        this.ormArtistRepository,
        this.ormSongRepository,
        playlistRepository,
      ),
      new NestLogger(),
    );
    service.execute(streamAppDto);
    return;
  }
}

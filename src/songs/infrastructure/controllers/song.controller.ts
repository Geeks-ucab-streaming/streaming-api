import { Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import { FindSongsByArtistIdService } from '../../application/services/getSongsByArtist.service';
import { EntityManager } from 'typeorm';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/common/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { GetSongBPlaylistIdService } from 'src/songs/application/services/getSongsByPlaylistId.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { Result } from 'src/common/domain/logic/Result';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { TransmitWsGateway } from '../sockets/transmit-ws.gateway';
import { Socket } from 'socket.io';
import { GetTrendingSongsService } from 'src/songs/application/services/getTrendingSongs.service';
import { SongDto } from 'src/dtos';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import { AddStreamToSongService } from 'src/songs/application/services/addStreamtoSong.service';
import { IStreamRepository } from 'src/common/domain/repositories/ISongStreamRepository';
import { StreamRepository } from 'src/common/infrastructure/repositories/streamsRepository.impl';
import { PlaylistRepository } from 'src/playlist/infrastructure/PlaylistRepository.impl';
import { IPlaylistStreamRepository } from 'src/common/domain/repositories/IPlaylistStreamRepository';
import { PlaylistStreamsRepository } from 'src/common/infrastructure/repositories/playlistStreamsRepository.impl';
import { MyResponse } from 'src/common/infrastructure/Response';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';

export class TrendingSongsDto {
  songs: SongDto[];
}

@Controller('api/song')
export class SongsController {
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
          const dtoArtist = ArtistID.create(artist);
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

  @ApiTags('Songs')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MyResponse<Song>> {
    // this.getSongByIdService = new GetSongByIdService(this.ormSongRepository);
    // const song: Song = await this.getSongByIdService.execute(id);
    // return song;
    const dto: GetSongByIdServiceDto = { id: SongID.create(id) };
    const service = new LoggingApplicationServiceDecorator(
      new GetSongByIdService(this.ormSongRepository),
      new NestLogger(),
    );
    const result = await service.execute(dto);
    return MyResponse.fromResult(result);
  }

  @ApiTags('Songs')
  @Get('/artist/:artistId')
  async findByArtistId(
    @Param('artistId') id: string,
  ): Promise<MyResponse<Song[]>> {
    this.findSongsByArtistIdService = new FindSongsByArtistIdService(
      this.ormSongRepository,
    );
    const result = await this.findSongsByArtistIdService.execute(id);
    return MyResponse.fromResult(result);
  }
  @ApiTags('Songs')
  @Get('/playlist/:playlistId')
  async findByPlaylistId(
    @Param('playlistId') id: string,
  ): Promise<MyResponse<Song[]>> {
    this.getSongBPlaylistIdService = new GetSongBPlaylistIdService(
      this.ormSongRepository,
    );
    const result = await this.getSongBPlaylistIdService.execute(id);
    return MyResponse.fromResult(result);
  }

  @ApiTags('StreamedSong')
  @Post('/streamedsong')
  addStreamToSong(
    @Query() streamDto: { user: string; song: string; playlist?: string },
  ): void {
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
    service.execute(streamDto);
    return;
  }
}

import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  GetSongByIdService,
  GetSongByIdServiceDto,
} from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import { FindSongsByArtistIdService } from '../../application/services/getSongsByArtist.service';
import { EntityManager } from 'typeorm';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { GetSongBPlaylistIdService } from 'src/songs/application/services/getSongsByPlaylistId.service';
import { OrmArtistRepository } from 'src/artists/infrastructure/repositories/artist.repository.impl';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { Result } from 'src/common/domain/logic/Result';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { TransmitWsGateway } from '../sockets/transmit-ws.gateway';
import { Socket } from 'socket.io';

@Controller('api/songs')
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

  // @Get()
  // findAll(): Promise<Artist[]> {
  //   return this.findAllArtistService.execute();
  // }

  @ApiTags('Songs')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Result<Song>> {
    // this.getSongByIdService = new GetSongByIdService(this.ormSongRepository);
    // const song: Song = await this.getSongByIdService.execute(id);
    // return song;
    const dto: GetSongByIdServiceDto = { id };
    const service = new LoggingApplicationServiceDecorator(
      new GetSongByIdService(this.ormSongRepository),
      new NestLogger(),
    );
    const result = await service.execute(dto);
    return result;
  }

  @ApiTags('Songs')
  @Get('/artist/:artistId')
  findByArtistId(@Param('artistId') id: string): Promise<Result<Song[]>> {
    this.findSongsByArtistIdService = new FindSongsByArtistIdService(
      this.ormSongRepository,
    );
    return this.findSongsByArtistIdService.execute(id);
  }
  @ApiTags('Songs')
  @Get('/playlist/:playlistId')
  findByPlaylistId(@Param('playlistId') id: string): Promise<Song[]> {
    this.getSongBPlaylistIdService = new GetSongBPlaylistIdService(
      this.ormSongRepository,
    );
    return this.getSongBPlaylistIdService.execute(id);
  }
}

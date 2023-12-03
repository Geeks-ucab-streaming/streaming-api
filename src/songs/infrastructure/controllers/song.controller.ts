import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetSongByIdService } from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import { FindSongsByArtistIdService } from '../../application/services/getSongsByArtist.service';
import { EntityManager } from 'typeorm';
import { OrmSongRepository } from '../repositories/song.repository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { GetSongBPlaylistIdService } from 'src/songs/application/services/getSongsByPlaylistId.service';

@Controller('songs')
export class SongsController {
  private getSongByIdService: GetSongByIdService;
  private getSongBPlaylistIdService: GetSongBPlaylistIdService;
  private findSongsByArtistIdService: FindSongsByArtistIdService;
  private readonly ormSongRepository: OrmSongRepository;
  // private readonly findSongsByArtistIdService: FindSongsByPlaylistIdService;
  constructor() {
    this.ormSongRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
  }

  // @Get()
  // findAll(): Promise<Artist[]> {
  //   return this.findAllArtistService.execute();
  // }
  @ApiTags('Songs')
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Song> {
    this.getSongByIdService = new GetSongByIdService(this.ormSongRepository);
    return await this.getSongByIdService.execute(id);
  }


  @ApiTags('Songs')  
  @Get('/artist/:artistId')
  findByArtistId(@Param('artistId') id: string): Promise<Song[]> {
    this.findSongsByArtistIdService = new FindSongsByArtistIdService(
      this.ormSongRepository,
    );
    return this.findSongsByArtistIdService.execute(id);
  }

  @Get('/playlist/:playlistId')
  findByPlaylistId(@Param('playlistId') id: string): Promise<Song[]> {
    this.getSongBPlaylistIdService = new GetSongBPlaylistIdService(
      this.ormSongRepository,
    );
    return this.getSongBPlaylistIdService.execute(id);
  }
}

import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumByArtistID';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { IPlaylistRepository } from 'src/playlist/domain/IPlaylistRepository';
import { Playlist } from 'src/playlist/domain/playlist';
import { DataSource, getMetadataArgsStorage } from 'typeorm';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

@Controller('playlists')
export class PlaylistController {
  dataSource: DataSource;
  private repository: PlaylistRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private readonly findOnePlaylistService: FindAlbumByArtistIDService;

  async init() {
    this.dataSource = await this.dataSource.initialize();
  }

  constructor() {
    // private readonly findOnePlaylistService: FindAlbumByArtistIDService,  @Inject('FindPlaylistByIdService') // @Inject('FindOnePlaylistService') // private readonly findPlaylistByIdService: FindAlbumByPlaylistIDService,
    this.dataSource = new DataSource({
      type: 'postgres',
      url: process.env.HOST,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    this.init().then(() => {
      this.repository = new PlaylistRepository(
        this.dataSource,
        new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
      );
    });
    // this.dataSource = this.dataSource.initialize();
    // this.repository = new PlaylistRepository(
    //   this.dataSource,
    //   new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
    // );
  }

  //   @Get()
  //   findAll(): Promise<Playlist[]> {
  //     return this.findAllPlaylistService.execute();
  //   }

  @Get('/FindByArtistID/:id')
  find(@Param('id') id: string): Promise<Playlist> {
    this.findPlaylistByIdService = new FindAlbumByPlaylistIDService(
      this.repository,
    );
    return this.findPlaylistByIdService.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Playlist> {
    this.findPlaylistByIdService = new FindAlbumByPlaylistIDService(
      this.repository,
    );
    return this.findPlaylistByIdService.execute(id);
  }
}

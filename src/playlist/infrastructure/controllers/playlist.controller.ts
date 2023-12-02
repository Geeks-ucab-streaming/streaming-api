<<<<<<< HEAD
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindAlbumByArtistIDService } from "src/playlist/application/dtos/services/FindAlbumByArtistID";
import { FindAlbumByPlaylistIDService } from "src/playlist/application/dtos/services/FindAlbumByPlaylistID.service";
import { Playlist } from "src/playlist/domain/playlist";
=======
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
>>>>>>> 2c9542090ede0f1de28afc070be2a365f71f3bfc

@Controller('playlists')
export class PlaylistController {
  private repository: PlaylistRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private findPlaylistByArtistIdService: FindAlbumByArtistIDService;

<<<<<<< HEAD
  ) {}

//   @Get()
//   findAll(): Promise<Playlist[]> {
//     return this.findAllPlaylistService.execute();
//   }
  @ApiTags('Playlist')
=======
  constructor() {
    this.repository = new PlaylistRepository(
      DataSourceSingleton.getInstance(),
      new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
    );
  }

>>>>>>> 2c9542090ede0f1de28afc070be2a365f71f3bfc
  @Get('/FindByArtistID/:id')
  find(@Param('id') id: string): Promise<Playlist[]> {
    this.findPlaylistByArtistIdService = new FindAlbumByArtistIDService(
      this.repository,
    );
    return this.findPlaylistByArtistIdService.execute(id);
  }
  @ApiTags('Playlist')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Playlist> {
    this.findPlaylistByIdService = new FindAlbumByPlaylistIDService(
      this.repository,
    );
    return this.findPlaylistByIdService.execute(id);
  }
}

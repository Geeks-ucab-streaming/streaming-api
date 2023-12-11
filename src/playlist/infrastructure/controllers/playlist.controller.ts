/*import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
export class PlaylistController {
  private repository: PlaylistRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private findPlaylistByArtistIdService: FindAlbumByArtistIDService;

  constructor() {
    this.repository = new PlaylistRepository(
      DataSourceSingleton.getInstance(),
      new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER),
    );
  }
  @ApiTags('Playlist')
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
*/
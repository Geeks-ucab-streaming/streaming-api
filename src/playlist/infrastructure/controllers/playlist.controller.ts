import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/services/FindAlbumsByArtistID.service';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';
import { PlaylistRepository } from '../PlaylistRepository.impl';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
import { ApiTags } from '@nestjs/swagger';
import { OrmSongRepository } from 'src/songs/infrastructure/repositories/song.repository.impl';
import { FindTopPlaylistsService } from 'src/playlist/application/services/FindTopPlaylists.service';

@Controller('playlists')
export class PlaylistController {
  private repository: PlaylistRepository;
  private songRepository: OrmSongRepository;
  private findPlaylistByIdService: FindAlbumByPlaylistIDService;
  private findPlaylistByArtistIdService: FindAlbumByArtistIDService;
  private findTopPlaylistsService: FindTopPlaylistsService;

  constructor() {
    this.repository = new PlaylistRepository(DataSourceSingleton.getInstance());
    this.songRepository = new OrmSongRepository(
      DataSourceSingleton.getInstance(),
    );
  }
  @ApiTags('Playlist')
  @Get('/FindByArtistID/:id')
  findByArtistId(@Param('id') id: string): Promise<Playlist[]> {
    this.findPlaylistByArtistIdService = new FindAlbumByArtistIDService(
      this.repository,
      this.songRepository,
    );
    return this.findPlaylistByArtistIdService.execute(id);
  }
  @ApiTags('Playlist')
  @Get(':id')
  findById(@Param('id') id: string): Promise<Playlist> {
    this.findPlaylistByIdService = new FindAlbumByPlaylistIDService(
      this.repository,
      this.songRepository,
    );
    return this.findPlaylistByIdService.execute(id);
  }

  @ApiTags('TopPlaylist')
  @Get('/top_playlist')
  async findTopPlaylists(): Promise<Playlist[]> {
    this.findTopPlaylistsService = new FindTopPlaylistsService(
      this.repository,
      this.songRepository,
    );
    return this.findTopPlaylistsService.execute();
  }
}

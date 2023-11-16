import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAlbumByArtistIDService } from 'src/playlist/application/dtos/services/FindAlbumByArtistID';
import { FindAlbumByPlaylistIDService } from 'src/playlist/application/dtos/services/FindAlbumByPlaylistID.service';
import { Playlist } from 'src/playlist/domain/playlist';

@Controller('playlists')
export class PlaylistController {
  constructor(
    @Inject('FindOnePlaylistService')
    private readonly findOnePlaylistService: FindAlbumByArtistIDService,
    @Inject('FindPlaylistByIdService')
    private readonly findPlaylistByIdService: FindAlbumByPlaylistIDService,
  ) {}

  //   @Get()
  //   findAll(): Promise<Playlist[]> {
  //     return this.findAllPlaylistService.execute();
  //   }

  @Get('/FindByArtistID/:id')
  find(@Param('id') id: string): Promise<Playlist> {
    return this.findOnePlaylistService.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Playlist> {
    return this.findPlaylistByIdService.execute(id);
  }
}

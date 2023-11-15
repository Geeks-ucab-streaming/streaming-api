import { Controller, Get, Inject, Param } from "@nestjs/common";
import { FindAlbumByArtistIDService } from "src/playlist/application/dtos/services/FindAlbumByArtistID";
import { Playlist } from "src/playlist/domain/playlist";

@Controller('playlists')
export class PlaylistController {
  constructor(
    @Inject('FindOnePlaylistService')
    private readonly findOnePlaylistService: FindAlbumByArtistIDService,

  ) {}

//   @Get()
//   findAll(): Promise<Playlist[]> {
//     return this.findAllPlaylistService.execute();
//   }

  @Get('/:id')
  find(@Param('id') id: string): Promise<Playlist> {
        console.log('lolasocon');
    return this.findOnePlaylistService.execute(id);
  }
}
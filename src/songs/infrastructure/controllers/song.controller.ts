import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetSongByIdService } from 'src/songs/application/services/GetSongById.service';
import { Song } from 'src/songs/domain/song';

@Controller('songs')
export class SongsController {
  constructor(
    @Inject('GetSongById')
    private readonly findSongById: GetSongByIdService, // @Inject('FindAllArtistService')
    // private readonly findAllArtistService: FindAllArtistService,
  ) {}

  // @Get()
  // findAll(): Promise<Artist[]> {
  //   return this.findAllArtistService.execute();
  // }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Song> {
    return this.findSongById.execute(id);
  }
}

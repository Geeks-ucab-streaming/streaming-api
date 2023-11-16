import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetSongByIdService } from '../../application/services/getSongById.service';
import { Song } from 'src/songs/domain/song';
import { ApiTags } from '@nestjs/swagger';

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
  @ApiTags('Songs')
  @Get('/:id')
  findById(@Param('id') id: string): Promise<Song> {
    return this.findSongById.execute(id);
  }
}

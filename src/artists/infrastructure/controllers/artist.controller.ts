import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
import { Artist } from 'src/artists/domain/artist';
@Controller('artists')
export class ArtistController {
  constructor(
    @Inject('FindOneArtistService')
    private readonly findOneArtistService: FindOneArtistService,

    @Inject('FindAllArtistService')
    private readonly findAllArtistService: FindAllArtistService,

    @Inject('GetSongByArtistId')
    private readonly findSongsByArtistIdService: GetSongByArtistId,
  ) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.findAllArtistService.execute();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findOneArtistService.execute(id);
  }
  @Get('/songs/:id')
  findSongsById(@Param('id') id: string): Promise<any> {
    return this.findSongsByArtistIdService.execute(id);
  }
}

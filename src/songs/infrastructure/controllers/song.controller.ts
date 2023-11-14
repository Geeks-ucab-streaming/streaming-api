import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
import { Artist } from 'src/artists/domain/artist';

@Controller('songs')
export class SongsController {
  constructor(
    @Inject('FindOneArtistService')
    private readonly findOneArtistService: FindOneArtistService,

    @Inject('FindAllArtistService')
    private readonly findAllArtistService: FindAllArtistService,
  ) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.findAllArtistService.execute();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findOneArtistService.execute(id);
  }
}

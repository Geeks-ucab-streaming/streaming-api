import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
import { Artist } from 'src/artists/domain/artist';
import { OrmArtistRepository } from '../repositories/artist.repository.impl';
@Controller('artists')
export class ArtistController {
  private findOneArtistService: FindOneArtistService;
  private findAllArtistService: FindAllArtistService;
  private findSongsByArtistIdService: GetSongByArtistId;
  private readonly ormSongRepository: OrmArtistRepository;
  constructor() {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.findAllArtistService.execute();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findOneArtistService.execute(id);
  }
  @Get('/ArtistsSongsByArtistId/:id')
  findSongsById(@Param('id') id: string): Promise<any> {
    return this.findSongsByArtistIdService.execute(id);
  }
}

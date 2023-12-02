import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
import { Artist } from 'src/artists/domain/artist';
import { OrmArtistRepository } from '../repositories/artist.repository.impl';
@Controller('artists')
export class ArtistController {
<<<<<<< HEAD
  constructor(
    @Inject('FindOneArtistService')
    private readonly findOneArtistService: FindOneArtistService,

    @Inject('FindAllArtistService')
    private readonly findAllArtistService: FindAllArtistService,

    @Inject('GetSongByArtistId')
    private readonly findSongsByArtistIdService: GetSongByArtistId,
  ) {}
  @ApiTags('Artist')
=======
  private findOneArtistService: FindOneArtistService;
  private findAllArtistService: FindAllArtistService;
  private findSongsByArtistIdService: GetSongByArtistId;
  private readonly ormSongRepository: OrmArtistRepository;
  constructor() {}

>>>>>>> 2c9542090ede0f1de28afc070be2a365f71f3bfc
  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.findAllArtistService.execute();
  }
  @ApiTags('Artist')
  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findOneArtistService.execute(id);
  }
  @ApiTags('Artist')
  @Get('/ArtistsSongsByArtistId/:id')
  findSongsById(@Param('id') id: string): Promise<any> {
    return this.findSongsByArtistIdService.execute(id);
  }
}

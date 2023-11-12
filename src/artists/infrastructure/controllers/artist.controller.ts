import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ArtistDto } from '../../application/dtos/artist.dto';
import { IArtistService } from 'src/artists/domain/artist.service.interface';
import { FindArtistService } from 'src/artists/application/services/find-artist.service';
import { Artist } from 'src/artists/domain/artist';
import { IFindGenericService } from 'src/common/domain/find.service';

@Controller('artists')
export class ArtistController {
  constructor(
    @Inject('IArtistService')
    private readonly artistService: IArtistService,
    @Inject('IFindGenericService')
    private readonly findArtistService: IFindGenericService<Artist>,
  ) {}

  @Post()
  create(@Body() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }

  @Get()
  findAll(): Promise<Artist[]> {
    return this.findArtistService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findArtistService.findById(id);
  }
}

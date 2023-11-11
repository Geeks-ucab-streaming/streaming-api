import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ArtistDto } from '../../application/dtos/artist.dto';
import { IArtistService } from 'src/artists/domain/artist.service.interface';

@Controller('artists')
export class ArtistController {
  constructor(
    @Inject('ArtistService')
    private readonly artistService: IArtistService,
  ) {}

  @Post()
  create(@Body() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistDto } from '../../application/dtos/artist.dto';
import { ArtistService } from '../../application/services/artist.service';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}

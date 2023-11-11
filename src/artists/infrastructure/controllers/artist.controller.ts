import { Controller, Get, Post, Query } from '@nestjs/common';
import { ArtistDto } from 'src/artists/application/dtos/artist.dto';
import { ArtistService } from '../../application/services/artist.service';

@Controller('artista')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post('/pruebaArtista')
  Create(@Query() body: ArtistDto) {
    return this.artistService.create(body);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}

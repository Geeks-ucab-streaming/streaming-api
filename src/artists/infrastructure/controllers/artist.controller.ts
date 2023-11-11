import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArtistDto } from '../../application/dtos/artist.dto';
import { ArtistService } from '../../application/services/artist.service';
import { query } from 'express';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Query() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}

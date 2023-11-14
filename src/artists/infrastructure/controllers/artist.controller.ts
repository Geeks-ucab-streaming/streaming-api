import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IFindGenericService } from 'src/common/domain/find.service';
@Controller('artists')
export class ArtistController {
  constructor(
    @Inject('IFindGenericService')
    private readonly findArtistService: IFindGenericService<Artist>,
  ) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.findArtistService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Artist> {
    return this.findArtistService.findById(id);
  }
}

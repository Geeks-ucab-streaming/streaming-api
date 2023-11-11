import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PruebaArtistasService } from './prueba-artistas.service';
import { CreatePruebaArtistaDto } from './dto/create-prueba-artista.dto';
import { UpdatePruebaArtistaDto } from './dto/update-prueba-artista.dto';

@Controller('prueba-artistas')
export class PruebaArtistasController {
  constructor(private readonly pruebaArtistasService: PruebaArtistasService) {}

  @Post()
  create(@Body() createPruebaArtistaDto: CreatePruebaArtistaDto) {
    return this.pruebaArtistasService.create(createPruebaArtistaDto);
  }

  @Get()
  findAll() {
    return this.pruebaArtistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebaArtistasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruebaArtistaDto: UpdatePruebaArtistaDto) {
    return this.pruebaArtistasService.update(+id, updatePruebaArtistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebaArtistasService.remove(+id);
  }
}

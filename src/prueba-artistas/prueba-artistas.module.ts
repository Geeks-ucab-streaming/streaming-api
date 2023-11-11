import { Module } from '@nestjs/common';
import { PruebaArtistasService } from './prueba-artistas.service';
import { PruebaArtistasController } from './prueba-artistas.controller';

@Module({
  controllers: [PruebaArtistasController],
  providers: [PruebaArtistasService],
})
export class PruebaArtistasModule {}

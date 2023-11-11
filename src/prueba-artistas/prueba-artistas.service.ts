import { Injectable } from '@nestjs/common';
import { CreatePruebaArtistaDto } from './dto/create-prueba-artista.dto';
import { UpdatePruebaArtistaDto } from './dto/update-prueba-artista.dto';

@Injectable()
export class PruebaArtistasService {
  create(createPruebaArtistaDto: CreatePruebaArtistaDto) {
    return 'This action adds a new pruebaArtista';
  }

  findAll() {
    return `This action returns all pruebaArtistas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pruebaArtista`;
  }

  update(id: number, updatePruebaArtistaDto: UpdatePruebaArtistaDto) {
    return `This action updates a #${id} pruebaArtista`;
  }

  remove(id: number) {
    return `This action removes a #${id} pruebaArtista`;
  }
}

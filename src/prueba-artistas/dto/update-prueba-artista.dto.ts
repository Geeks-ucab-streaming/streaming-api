import { PartialType } from '@nestjs/swagger';
import { CreatePruebaArtistaDto } from './create-prueba-artista.dto';

export class UpdatePruebaArtistaDto extends PartialType(CreatePruebaArtistaDto) {}

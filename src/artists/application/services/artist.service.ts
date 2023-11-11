import { ArtistRepository } from '../../domain/artist.repository';
import { Artist } from '../../domain/artist';
import { ArtistDto } from '../dtos/artist.dto';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
  ) {}

  async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = new Artist(
      artistDto.id,
      artistDto.name,
      artistDto.image_reference,
    );
    return this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistRepository.findOne(id);
  }
}

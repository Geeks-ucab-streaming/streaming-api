
import { ArtistRepository } from 'src/artists/domain/artist.repository';
import { IArtistService } from 'src/artists/domain/artist.service.interface';
import { ArtistDto } from '../dtos/artist.dto';
import { Artist } from 'src/artists/domain/artist';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ArtistService implements IArtistService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository) {}

  async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = new Artist(
      artistDto.id,
      artistDto.name,
      artistDto.duration,
      artistDto.image_reference,
    );
    return this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }
}
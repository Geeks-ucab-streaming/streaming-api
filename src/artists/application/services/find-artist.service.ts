import { Inject, Injectable } from '@nestjs/common';
import { IFindGenericService } from 'src/common/domain/find.service';
import { Artist } from 'src/artists/domain/artist';
import { IArtistRepository } from 'src/artists/domain/artist.repository';

@Injectable()
export class FindArtistService implements IFindGenericService<Artist> {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
  ) {}

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.findAll();
  }

  async findById(id: string): Promise<Artist> {
    return await this.artistRepository.findById(id);
  }
}

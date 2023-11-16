import { Inject, Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IFindService } from 'src/common/domain/ifind.service';

@Injectable()
export class FindOneArtistService implements IFindService<string, Artist> {
  constructor(
    @Inject('IGenericRepository')
    private readonly artistRepository: IFindGenericRepository<Artist>,
    @Inject('GetArtistImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(id: string): Promise<Artist> {
    const result = await this.artistRepository.find(id);
    const artist = Array.isArray(result) ? result[0] : result;
    if (!artist) {
      throw new Error('Artist not found');
    }
    const image = await this.getFileService.execute(
      artist.image_reference.toLowerCase(),
    );

    const artistWithImage: Artist = Object.assign(artist, {
      image: image,
      equals: (other: Artist) => artist.equals(other),
    });
    return artistWithImage;
  }
}

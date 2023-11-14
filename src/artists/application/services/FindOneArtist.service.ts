import { Inject, Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { IFindService } from 'src/common/domain/ifind.service';

@Injectable()
export class FindOneArtistService implements IFindService<string, Artist> {
  constructor(
    @Inject('IGenericRepository')
    private readonly artistRepository: IGenericRepository<Artist>,
    @Inject('GetArtistImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findById(id);
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

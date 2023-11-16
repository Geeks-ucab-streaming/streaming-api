import { Inject, Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/domain/artist';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { IFindService } from 'src/common/domain/ifind.service';
@Injectable()
export class FindAllArtistService implements IFindService<void, Artist[]> {
  constructor(
    @Inject(' IFindGenericRepository')
    private readonly artistRepository: IFindGenericRepository<Artist>,
    @Inject('GetArtistImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async execute(): Promise<Artist[]> {
    const result = await this.artistRepository.find();
    const artists = Array.isArray(result) ? result : [result];

    const artistPromises = artists.map(async (artist) => {
      const image = await this.getFileService.execute(
        artist.image_reference.toLowerCase(),
      );

      const artistWithImage: Artist = Object.assign(artist, {
        image: image,
        equals: (other: Artist) => artist.equals(other),
      });

      return artistWithImage;
    });

    return Promise.all(artistPromises);
  }
}

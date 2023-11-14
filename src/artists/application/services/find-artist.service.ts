import { Inject, Injectable } from '@nestjs/common';
import { IFindGenericService } from 'src/common/domain/find.service';
import { Artist } from 'src/artists/domain/artist';
import { IGenericRepository } from 'src/common/domain/generic.repository';
import { IFindService } from 'src/common/domain/ifind.service';

interface ArtistWithImage extends Artist {
  image: Buffer;
}

@Injectable()
export class FindArtistService implements IFindGenericService<Artist> {
  constructor(
    @Inject('IGenericRepository')
    private readonly artistRepository: IGenericRepository<Artist>,
    @Inject('GetArtistImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}

  async findAll(): Promise<ArtistWithImage[]> {
    const artists: Artist[] = await this.artistRepository.findAll();

    const artistPromises = artists.map(async (artist) => {
      const image = await this.getFileService.execute(
        artist.image_reference.toLowerCase(),
      );

      const artistWithImage: ArtistWithImage = Object.assign(artist, {
        image: image,
        equals: (other: Artist) => artist.equals(other),
      });

      return artistWithImage;
    });

    const artist_with_image: ArtistWithImage[] =
      await Promise.all(artistPromises);

    return artist_with_image;
  }

  async findById(id: string): Promise<Artist> {
    return await this.artistRepository.findById(id);
  }
}

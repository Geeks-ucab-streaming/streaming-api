import { Inject, Injectable } from '@nestjs/common';
import { IFindGenericService } from 'src/common/domain/find.service';
import { Artist } from 'src/artists/domain/artist';
import { IGetFileService } from 'src/common/domain/services/getFiles.service.interface';
import { IGenericRepositoryFinder } from 'src/common/domain/generic.repository';

interface ArtistWithImage extends Artist {
  image: Buffer;
}

@Injectable()
export class FindArtistService implements IFindGenericService<Artist> {
  constructor(
    @Inject('IGenericRepository')
    private readonly artistRepository: IGenericRepositoryFinder<Artist>,
    @Inject('IGetFileService')
    private readonly getFileService: IGetFileService,
  ) {}

  async findAll(): Promise<ArtistWithImage[]> {
    const artists: Artist[] = await this.artistRepository.findAll();

    const artistPromises = artists.map(async (artist) => {
      const image = await this.getFileService.execute(
        artist.image_reference.toLowerCase(),
      );

      return {
        ...artist,
        image: image,
      };
    });

    const artist_with_image: ArtistWithImage[] =
      await Promise.all(artistPromises);

    return artist_with_image;
  }

  async findById(id: string): Promise<Artist> {
    return await this.artistRepository.findById(id);
  }
}

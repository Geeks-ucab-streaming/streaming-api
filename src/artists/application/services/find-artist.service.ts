import { Inject, Injectable } from '@nestjs/common';
import { IFindGenericService } from 'src/common/domain/find.service';
import { Artist } from 'src/artists/domain/artist';
import { IArtistRepository } from 'src/artists/domain/artist.repository';
import { IGetFileService } from 'src/common/domain/services/getFiles.service.interface';

interface ArtistWithImage extends Artist {
  image: string;
}

@Injectable()
export class FindArtistService implements IFindGenericService<Artist> {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('IGetFileService')
    private readonly getFileService: IGetFileService,
  ) {}

  async findAll(): Promise<ArtistWithImage[]> {
    const artists: Artist[] = await this.artistRepository.findAll();

    const artistPromises = artists.map(async (artist) => {
      const imageBuffer = await this.getFileService.execute(
        artist.image_reference.toLowerCase(),
      );

      const imageBase64 = imageBuffer.toString('base64');

      return {
        ...artist,
        image: imageBase64,
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

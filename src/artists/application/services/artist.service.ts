import { IArtistRepository } from 'src/artists/domain/artist.repository';
import { IArtistService } from 'src/artists/domain/artist.service.interface';
import { ArtistDto } from '../dtos/artist.dto';
import { Artist } from 'src/artists/domain/artist';
import { Injectable, Inject } from '@nestjs/common';
import { IGetFileService } from 'src/common/domain/services/getFiles.service.interface';

//! SE VA ESTE, ESTAMOS USANDO EL GENERICO

interface ArtistWithImage extends Artist {
  image: Buffer;
}

@Injectable()
export class ArtistService implements IArtistService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('IGetFileService')
    private readonly getFileService: IGetFileService,
  ) {}

  async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = new Artist(
      artistDto.id,
      artistDto.name,
      artistDto.image_reference,
    );
    return this.artistRepository.save(artist);
  }

  // async findAll(): Promise<Artist[]> {
  //   return this.artistRepository.findAll();
  // }

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

    console.log(artist_with_image);
    return artist_with_image;
  }
}

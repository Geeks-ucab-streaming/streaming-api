import { Inject, Injectable } from "@nestjs/common";
import { Artist } from "src/artists/domain/artist";
import { IGenericRepository } from "src/common/domain/generic.repository";
import { IFindService } from "src/common/domain/ifind.service";
interface ArtistWithImage extends Artist {
  image: Buffer;
}
@Injectable()
export class FindAllArtistService
  implements IFindService<void, ArtistWithImage[]>{
      constructor(
    @Inject('IGenericRepository')
    private readonly artistRepository: IGenericRepository<Artist>,
    @Inject('GetArtistImageService')
    private readonly getFileService: IFindService<string, Buffer>,
  ) {}
  
  async execute(): Promise<ArtistWithImage[]> {
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

    return Promise.all(artistPromises);
  }
}
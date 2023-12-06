import { ArtistImage } from '../value-objects/artistImage-valueobject';

export class InvalidArtistImageException extends DomainException<ArtistImage> {
  //   public readonly message = 'Invalid Image';
  //   public readonly errorCode: string = 'InvalidArtistImageException';
  //   public readonly httpStatus: number = 400;
  constructor(artistImage: ArtistImage) {
    super(artistImage, 'Invalid Image', 'InvalidArtistImageException', 400);
  }
}

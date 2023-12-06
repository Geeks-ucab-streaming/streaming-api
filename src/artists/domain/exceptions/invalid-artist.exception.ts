import { Artist } from '../artist';

export class InvalidArtistImageException extends DomainException<Artist> {
//   public readonly message = 'Invalid Image';
//   public readonly errorCode: string = 'InvalidArtistImageException';
//   public readonly httpStatus: number = 400;
  constructor(artist: Artist) {
    super(artist, 'Invalid Image', 'InvalidArtistImageException', 400);
  }
}

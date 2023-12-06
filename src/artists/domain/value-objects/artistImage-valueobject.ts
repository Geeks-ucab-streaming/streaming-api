import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';
import { InvalidArtistImageException } from '../exceptions/invalid-artist.exception';

export class ArtistImage implements IValueObject<ArtistImage> {
  private readonly image: string;

  get Image(): string {
    return this.image;
  }

  private constructor(image: string) {
    if (image && image.length > 0) {
      this.image = image;
    } else {
    //  throw new Error('Image no puede ser vacio');
      throw new InvalidArtistImageException(this);
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: ArtistImage): boolean {
    return this.Image === other.Image;
  }

  public static create(image: string): ArtistImage {
    return new ArtistImage(image);
  }
}

import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';
import { InvalidArtistNameException } from '../exceptions/invalid-artist-name.exception';

export class ArtistName implements IValueObject<ArtistName> {
  private readonly value: string;
  get Value(): string {
    return this.value;
  }
  private constructor(value: string) {
    if (value && value.length > 0) {
      this.value = value;
    } else {
      throw new InvalidArtistNameException(this);
    } //Aqui deberiamos crear una excepcion
  }
  public equals(other: ArtistName): boolean {
    return this.Value === other.Value;
  }
  public static create(value: string): ArtistName {
    return new ArtistName(value);
  }
}

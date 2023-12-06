import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';
import { InvalidArtistNameException } from '../exceptions/invalid-artist-name.exception';

export class ArtistName implements IValueObject<ArtistName> {
  private readonly name: string;
  get Name(): string {
    return this.name;
  }
  private constructor(name: string) {
    if (name && name.length > 0) {
      this.name = name;
    } else {
      throw new InvalidArtistNameException(this);
    } //Aqui deberiamos crear una excepcion
  }
  public equals(other: ArtistName): boolean {
    return this.Name === other.Name;
  }
  public static create(name: string): ArtistName {
    return new ArtistName(name);
  }
}

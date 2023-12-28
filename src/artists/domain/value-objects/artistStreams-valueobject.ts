import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class ArtistStreams implements IValueObject<ArtistStreams> {
  private value: number;

  get Value(): number {
    return this.value;
  }

  private constructor(value: number) {
    if (value >= 0) this.value = value;
    else {
      throw new Error('las reproducciones no pueden ser negativas');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: ArtistStreams): boolean {
    return this.value === other.value;
  }

  public static create(value: number): ArtistStreams {
    return new ArtistStreams(value);
  }

  public addstreams(): void {
    this.value++;
  }
}

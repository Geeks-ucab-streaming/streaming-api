import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongDuration implements IValueObject<SongDuration> {
  private readonly value: number;

  get Value(): number {
    return this.value;
  }

  private constructor(value: number) {
    if (this.checkDuration(value)) this.value = value;
    else {
      throw new Error('la duración no puede ser despues de este momento');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongDuration): boolean {
    return this.value === other.value;
  }

  public static create(value: number): SongDuration {
    return new SongDuration(value);
  }

  private checkDuration(value: number): boolean {
    console.log(value);
    return value > 0;
  }
}

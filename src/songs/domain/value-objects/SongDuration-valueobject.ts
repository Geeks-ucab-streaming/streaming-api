import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongDuration implements IValueObject<SongDuration> {
  private readonly value: string;

  get Value(): string {
    return this.value;
  }

  private constructor(value: string) {
    if (this.checkDuration(value)) this.value = value;
    else {
      throw new Error('la duración no puede ser despues de este momento');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongDuration): boolean {
    return this.value === other.value;
  }

  public static create(value: string): SongDuration {
    return new SongDuration(value);
  }

  private checkDuration(value: string): boolean {
    const regex = /^[0-5]?[0-9]:[0-5][0-9]$/;
    return regex.test(value);
  }
}

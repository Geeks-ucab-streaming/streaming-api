import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongCreationDate implements IValueObject<SongCreationDate> {
  private readonly value: Date;

  get Value(): Date {
    return this.value;
  }

  private constructor(value: Date) {
    if (this.checkDate(this.value)) this.value = value;
    else {
      throw new Error(
        'la fecha de creación no puede ser despues de este momento',
      );
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongCreationDate): boolean {
    return this.value === other.value;
  }

  public static create(value: Date): SongCreationDate {
    return new SongCreationDate(value);
  }

  private checkDate(date: Date): boolean {
    return !(date > new Date());
  }
}

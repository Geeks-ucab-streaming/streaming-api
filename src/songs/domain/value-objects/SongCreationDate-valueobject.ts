import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongCreationDate implements IValueObject<SongCreationDate> {
  private readonly creationDate: Date;

  public get(): Date {
    return this.creationDate;
  }

  private constructor(creationDate: Date) {
    if (this.checkDate(this.creationDate)) this.creationDate = creationDate;
    else {
      throw new Error(
        'la fecha de creación no puede ser despues de este momento',
      );
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongCreationDate): boolean {
    return this.creationDate === other.creationDate;
  }

  public static create(creationDate: Date): SongCreationDate {
    return new SongCreationDate(creationDate);
  }

  private checkDate(date: Date): boolean {
    return !(date > new Date());
  }
}

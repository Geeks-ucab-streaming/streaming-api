import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';

export class SongName implements IValueObject<SongName> {
  private readonly value: string;
  get Value(): string {
    return this.value;
  }
  private constructor(value: string) {
    if (value && value.length > 0) {
      this.value = value;
    } else {
      throw new Error('Name no puede ser vacio');
    } //Aqui deberiamos crear una excepcion
  }
  public equals(other: SongName): boolean {
    return this.Value === other.Value;
  }
  public static create(value: string): SongName {
    return new SongName(value);
  }
}

import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';
import { Playlist } from '../playlist';

export class PlaylistName implements IValueObject<PlaylistName> {
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
  public equals(other: PlaylistName): boolean {
    return this.Value === other.Value;
  }
  public static create(value: string): PlaylistName {
    return new PlaylistName(value);
  }
}

import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistDuration implements IValueObject<PlaylistDuration> {
  private readonly value: number;

  get Value(): number {
    return this.value;
  }

  private constructor(value: number) {
    if (this.checkDuration(value)) this.value = value;
    else {
      throw new Error('la duración debe estar en formato hh:mm:ss');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: PlaylistDuration): boolean {
    return this.value === other.value;
  }

  public static create(value: number): PlaylistDuration {
    return new PlaylistDuration(value);
  }

  private checkDuration(value: number): boolean {
    return value >= 0;
  }
}

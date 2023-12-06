import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistDuration implements IValueObject<PlaylistDuration> {
  private readonly value: string;

  get Value(): string {
    return this.value;
  }

  private constructor(value: string) {
    if (this.checkDuration(value)) this.value = value;
    else {
      throw new Error('la duración debe estar en formato hh:mm:ss');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: PlaylistDuration): boolean {
    return this.value === other.value;
  }

  public static create(value: string): PlaylistDuration {
    return new PlaylistDuration(value);
  }

  private checkDuration(value: string): boolean {
    const regex = /^[0-9]?[0-9]:[0-5]?[0-9]:[0-5][0-9]$/;
    return regex.test(value);
  }
}

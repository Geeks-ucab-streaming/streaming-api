import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistDuration implements IValueObject<PlaylistDuration> {
  private readonly duration: string;

  public get(): string {
    return this.duration;
  }

  private constructor(duration: string) {
    if (this.checkDuration(duration)) this.duration = duration;
    else {
      throw new Error('la duración debe estar en formato hh:mm:ss');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: PlaylistDuration): boolean {
    return this.duration === other.duration;
  }

  public static create(duration: string): PlaylistDuration {
    return new PlaylistDuration(duration);
  }

  private checkDuration(duration: string): boolean {
    const regex = /^[0-9]?[0-9]:[0-5]?[0-9]:[0-5][0-9]$/;
    return regex.test(duration);
  }
}

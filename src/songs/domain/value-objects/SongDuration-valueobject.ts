import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongDuration implements IValueObject<SongDuration> {
  private readonly duration: string;

  public get(): string {
    return this.duration;
  }

  private constructor(duration: string) {
    if (this.checkDuration(duration)) this.duration = duration;
    else {
      throw new Error('la duración no puede ser despues de este momento');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongDuration): boolean {
    return this.duration === other.duration;
  }

  public static create(duration: string): SongDuration {
    return new SongDuration(duration);
  }

  private checkDuration(duration: string): boolean {
    const regex = /^[0-5]?[0-9]:[0-5][0-9]$/;
    return regex.test(duration);
  }
}

import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongStreams implements IValueObject<SongStreams> {
  private streams: number;

  public get(): number {
    return this.streams;
  }

  private constructor(streams: number) {
    if (streams >= 0) this.streams = streams;
    else {
      throw new Error('las reproducciones no pueden ser negativas');
    } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongStreams): boolean {
    return this.streams === other.streams;
  }

  public static create(streams: number): SongStreams {
    return new SongStreams(streams);
  }

  public addstreams(): void {
    this.streams++;
  }
}

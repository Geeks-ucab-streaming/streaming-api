import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistStreams implements IValueObject<PlaylistStreams> {
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

  public equals(other: PlaylistStreams): boolean {
    return this.streams === other.streams;
  }

  public static create(streams: number): PlaylistStreams {
    return new PlaylistStreams(streams);
  }

  public addstreams(): void {
    this.streams++;
  }
}

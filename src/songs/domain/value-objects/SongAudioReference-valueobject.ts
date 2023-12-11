import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongAudioReference implements IValueObject<SongAudioReference> {
  private readonly audioReference: string;

  public get(): string {
    return this.audioReference;
  }

  private constructor(audioReference: string) {
    if (this.checkReference(audioReference))
      if (audioReference && audioReference.length > 0) {
        this.audioReference = audioReference.toLocaleLowerCase();
      } else {
        throw new Error('audioReference no puede ser vacio');
      } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongAudioReference): boolean {
    return this.audioReference === other.audioReference;
  }

  public static create(audioReference: string): SongAudioReference {
    return new SongAudioReference(audioReference);
  }

  private checkReference(reference: string): boolean {
    console.log(reference);
    return reference.endsWith('.mp3');
  }
}

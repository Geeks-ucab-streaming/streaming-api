import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class SongAudioReference implements IValueObject<SongAudioReference> {
  private readonly value: string;

  get Value(): string {
    return this.value;
  }

  private constructor(value: string) {
    if (this.checkReference(value))
      if (value && value.length > 0) {
        this.value = value.toLocaleLowerCase();
      } else {
        throw new Error('audioReference no puede ser vacio');
      } //Aqui deberiamos crear una excepcion
  }

  public equals(other: SongAudioReference): boolean {
    return this.value === other.value;
  }

  public static create(value: string): SongAudioReference {
    return new SongAudioReference(value);
  }

  private checkReference(reference: string): boolean {
    console.log(reference);
    return reference.endsWith('.mp3');
  }
}

  import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';

export class PlaylistImageReference
  implements IValueObject<PlaylistImageReference>
{
  private readonly value: string;

  get Value(): string {
    return this.value;
  }

  private constructor(value: string) {
    if (this.checkReference(value))
      if (value && value.length > 0) {
        this.value = value.toLocaleLowerCase();
      } else {
        throw new Error('ImageReference no puede ser vacio');
      } //Aqui deberiamos crear una excepcion
  }

  public equals(other: PlaylistImageReference): boolean {
    return this.value === other.value;
  }

  public static create(value: string): PlaylistImageReference {
    return new PlaylistImageReference(value);
  }

  private checkReference(reference: string): boolean {
    return reference.endsWith('.jpg') || reference.endsWith('.png');
  }
}

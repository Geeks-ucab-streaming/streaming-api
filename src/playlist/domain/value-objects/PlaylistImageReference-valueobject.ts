import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';

export class PlaylistImageReference
  implements IValueObject<PlaylistImageReference>
{
  private readonly imageReference: string;

  public get(): string {
    return this.imageReference;
  }

  private constructor(imageReference: string) {
    if (this.checkReference(imageReference))
      if (imageReference && imageReference.length > 0) {
        this.imageReference = imageReference.toLocaleLowerCase();
      } else {
        throw new Error('ImageReference no puede ser vacio');
      } //Aqui deberiamos crear una excepcion
  }

  public equals(other: PlaylistImageReference): boolean {
    return this.imageReference === other.imageReference;
  }

  public static create(imageReference: string): PlaylistImageReference {
    return new PlaylistImageReference(imageReference);
  }

  private checkReference(reference: string): boolean {
    return reference.endsWith('.jpg') || reference.endsWith('.png');
  }
}

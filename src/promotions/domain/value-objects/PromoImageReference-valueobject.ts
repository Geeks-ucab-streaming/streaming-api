import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PromoImageReference implements IValueObject<PromoImageReference> {
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

  public equals(other: PromoImageReference): boolean {
    return this.value === other.value;
  }

  public static create(value: string): PromoImageReference {
    return new PromoImageReference(value);
  }

  private checkReference(reference: string): boolean {
    return reference.endsWith('.jpg') || reference.endsWith('.png');
  }
}

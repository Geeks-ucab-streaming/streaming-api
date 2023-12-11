import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';
//import { InvalidPromotionImageException } from '../exceptions/promotionImage.exception';

export class PromotionImageReference implements IValueObject<PromotionImageReference> {
  private readonly value: string;

  private constructor(value: string) {
    if (this.checkReference(value))
      if (value && value.length > 0) {
        this.value = value.toLocaleLowerCase();
      } else {
        throw new Error('ImageReference no puede ser vacio');
      } //Aqui deberiamos crear una excepcion
  }

  get Value(): string {
    return this.value;
  }
  
  public equals(other: PromotionImageReference): boolean {
    return this.value === other.value;
  }

  public static create(value: string): PromotionImageReference {
    return new PromotionImageReference(value);
  }

  private checkReference(reference: string): boolean {
    return reference.endsWith('.jpg') || reference.endsWith('.png');
  }
}
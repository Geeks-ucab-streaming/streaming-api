
import { PromotionImageReference } from '../promotionAqqregate/value-objects/promocionImage-valueobject';
import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidPromotionImageException extends DomainException<PromotionImageReference> {
  constructor(artistImage: PromotionImageReference) {
    super(artistImage, 'Invalid Image', 'InvalidPromotionImageException', 400);
  }
}
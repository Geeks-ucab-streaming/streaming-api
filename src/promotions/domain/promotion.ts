import { UniqueEntityID } from "src/common/domain/unique-entity-id";
import { Entity } from 'src/common/domain/Entity/entity';
import { PromotionImage } from "./promotionImage-valueobject";

interface PromotionProps {
    image_reference: PromotionImage;
    image: Buffer | null;
  }
  export class Promotion extends Entity<PromotionProps> {
    image_reference: string;
    image: Buffer | null;
  
    get id(): UniqueEntityID {
      return this._id;
    }
    private constructor(props: PromotionProps, id: UniqueEntityID) {
      super(props, id);
    }
  }

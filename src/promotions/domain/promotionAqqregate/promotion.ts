import { AggregateRoot } from "src/common/domain/aggregate-root";
import { PromotionImageReference } from "./value-objects/promocionImage-valueobject";
import { PromotionId } from "./value-objects/promotionid-valueobject";
import { promotionCreatedEvent } from "../events/promotion-create-event";
import { DomainEvent } from "src/common/domain/Event/domain-event";
import { InvalidPromotionImageException } from "../exeptions/invalid-promotion.exeption";

export class Promotion extends AggregateRoot<PromotionId> {

  private image_reference: PromotionImageReference;
  private image: Buffer | null;

  protected constructor(
    id: PromotionId, 
    image_reference: PromotionImageReference
    ) {
    const promotionCreated = promotionCreatedEvent.create(id, image_reference);
    super(id,promotionCreated);
  }
  
  static create(
    id: PromotionId,
    image_reference: PromotionImageReference,
  ): Promotion {
    return new Promotion(id, image_reference);
  }
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
      case promotionCreatedEvent:
        const artistCreated = event as promotionCreatedEvent;
        this.image_reference = artistCreated.image_reference;
        break;
      default:
        throw new Error('Event no fue implementado.');
    }
  }

  protected ensureValidState(): void {
    if (!this.image_reference) throw new InvalidPromotionImageException(this.image_reference);
  }
  
  // Getters
  get ImageReference(): PromotionImageReference {
    return this.image_reference;
  }

  get Image(): Buffer | null {
    return this.image;
  }

  public setImage(image: Buffer) {
    this.image = image;
  }
}




// import { UniqueEntityID } from 'src/common/domain/unique-entity-id';
// import { Entity } from 'src/common/domain/Entity/entity';
// import { PromotionImage } from './promotionImage-valueobject';
// import { Result } from 'src/common/domain/logic/Result';
// import { Guard } from 'src/common/domain/logic/Guard';

// interface PromotionProps {
//   image_reference: PromotionImage;
//   image: Buffer | null;
// }
// export class Promotion extends Entity<PromotionProps> {
//   image_reference: string;
//   image: Buffer | null;

//   get id(): UniqueEntityID {
//     return this._id;
//   }
//   private constructor(props: PromotionProps, id: UniqueEntityID) {
//     super(props, id);
//   }

//   public static create(
//     props: PromotionProps,
//     id?: UniqueEntityID,
//   ): Result<Promotion> {
//     const guardResult = Guard.againstNullOrUndefinedBulk([
//       { argument: props.image_reference, argumentName: 'image_reference' },
//     ]);

//     if (!guardResult.succeeded) {
//       return Result.fail<Promotion>(guardResult.message);
//     }

//     const defaultValues: PromotionProps = {
//       ...props,
//       image: props.image ? props.image : null,
//     };

//     const promotion = new Promotion(
//       defaultValues,
//       id ? id : new UniqueEntityID(),
//     );
//     return Result.ok<Promotion>(promotion);
//   }
// }
/*
export class Promotion {
  id: string;
  image: Buffer | null;
  image_reference: string;
}*/

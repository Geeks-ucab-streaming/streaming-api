import { UniqueEntityID } from 'src/common/domain/unique-entity-id';
import { Entity } from 'src/common/domain/Entity/entity';
import { PromotionImage } from './promotionImage-valueobject';
import { Result } from 'src/common/domain/logic/Result';
import { Guard } from 'src/common/domain/logic/Guard';

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

  public static create(
    props: PromotionProps,
    id?: UniqueEntityID,
  ): Result<Promotion> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.image_reference, argumentName: 'image_reference' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Promotion>(guardResult.message);
    }

    const defaultValues: PromotionProps = {
      ...props,
      image: props.image ? props.image : null,
    };

    const promotion = new Promotion(
      defaultValues,
      id ? id : new UniqueEntityID(),
    );
    return Result.ok<Promotion>(promotion);
  }
}

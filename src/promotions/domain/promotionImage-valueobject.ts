// import { ValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
// import { Result } from 'src/common/domain/logic/Result';

// interface PromotionImageProps {
//   value: string;
// }

// export class PromotionImage extends ValueObject<PromotionImageProps> {
//   get value(): string {
//     return this.props.value;
//   }

//   private constructor(props: PromotionImageProps) {
//     super(props);
//   }

//   public static create(image: string): Result<PromotionImage> {
//     if (!!image === false || image.length === 0) {
//       return Result.fail<PromotionImage>('No puede contener un nombre vacio');
//     } else {
//       return Result.ok<PromotionImage>(new PromotionImage({ value: image }));
//     }
//   }
// }

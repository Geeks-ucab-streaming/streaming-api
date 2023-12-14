import { Expose } from 'class-transformer';
import { Phone } from 'src/phones/domain/value-objects/phone';

export class PhoneDto {
  @Expose()
  id: string;

  @Expose()
  phoneNumber: number;
}

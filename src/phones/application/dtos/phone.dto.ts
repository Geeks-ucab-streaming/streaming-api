import { Expose } from 'class-transformer';
import { Phone } from 'src/phones/domain/value-objects/phone';

export class PhoneDto extends Phone {
  @Expose()
  id: string;

  @Expose()
  phoneNumber: number;
}

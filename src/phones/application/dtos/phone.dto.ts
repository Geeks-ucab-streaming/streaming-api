import { Expose } from 'class-transformer';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';

export class PhoneDto {
  @Expose()
  id: string;

  @Expose()
  phoneNumber: number;

  @Expose()
  linePhoneId: string;

  @Expose()
  lineName: string;

}

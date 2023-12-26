import { Expose } from 'class-transformer';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';

export class PhoneDto {
  @Expose()
  id: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  linePhoneId: string;

  @Expose()
  lineName: string;

}

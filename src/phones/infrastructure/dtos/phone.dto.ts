import { Expose } from 'class-transformer';

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

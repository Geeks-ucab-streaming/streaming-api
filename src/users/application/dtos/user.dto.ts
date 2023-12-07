import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/userAggregate/user';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  suscriptionState: string;

  @Expose()
  gender: string;

  @Expose()
  phone: Phone;
}

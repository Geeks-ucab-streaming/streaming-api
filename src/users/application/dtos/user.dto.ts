import { Expose } from 'class-transformer';
import { PhoneDto } from 'src/phones/application/dtos/phone.dto';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  suscriptionState: string;

  @Expose()
  gender: string;

  @Expose()
  phone: PhoneDto;
  
}

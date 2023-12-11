import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/user';
import { Phone } from 'src/phones/domain/value-objects/phone';

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
  genero: string;

  @Expose()
  phonesNumber: Phone;
}

import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/user';
import { Phone } from 'src/phones/domain/phone';

export class UserDto extends User {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  genero: string;

  @Expose()
  phonesNumber: Phone;
}

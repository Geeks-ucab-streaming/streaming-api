import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/user';

export class UserDto extends User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  genero: string;

  @Expose()
  phonesNumber: number;
}

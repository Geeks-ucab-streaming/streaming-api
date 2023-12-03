import { Expose } from 'class-transformer';
import { User } from 'src/users/domain/userAggregate/user';
import { PhonesNumber } from 'src/users/domain/userAggregate/value-objects/phoneNumber';

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
  phonesNumber: PhonesNumber;
}

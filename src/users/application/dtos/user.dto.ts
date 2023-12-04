import { Expose } from 'class-transformer';
import { PhonesNumber } from 'src/users/domain/userAggregate/value-objects/phoneNumber';

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
  phonesNumber: PhonesNumber;
}

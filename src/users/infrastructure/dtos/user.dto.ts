import { Expose } from 'class-transformer';
import { PhoneDto } from 'src/phones/infrastructure/dtos/phone.dto';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IUserDto } from 'src/common/Application/dtoPorts/userDtoPort';

export class UserDto implements IUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  gender: string;

  @Expose()
  phone: PhoneDto;
  @Expose()
  token: string[];

}

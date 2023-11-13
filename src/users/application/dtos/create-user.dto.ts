import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';
import { PhonesNumber } from 'src/users/domain/value-objects/phoneNumber';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  genero: string;

  @IsNumber()
  @ApiProperty()
  phonesNumber: PhonesNumber;
}
import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';
import { isDate } from 'util/types';

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
  phonesNumber: number;
}

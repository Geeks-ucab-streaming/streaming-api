import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';

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

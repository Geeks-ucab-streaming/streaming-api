import {IsEmail, IsNumber, IsString, IsDate, IsOptional} from "class-validator";

export class CreateUserDto{
  
  @IsString()
  name: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  genero: string;

  @IsNumber()
  phonesNumber: number;
}
import {IsEmail, IsNumber, IsString, IsDate, IsOptional} from "class-validator";

export class UpdateUserDto{

  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  birth_date: Date;

  @IsOptional()
  @IsString()
  genero: string;

  @IsOptional()
  @IsNumber()
  phonesNumber: number;
}
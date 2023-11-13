import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, IsDate, IsOptional} from "class-validator";

export class UpdateUserDto{
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birth_date: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  genero: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  phonesNumber: number;
}
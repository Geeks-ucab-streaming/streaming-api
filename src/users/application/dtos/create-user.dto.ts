import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDate()
  @ApiProperty()
  birth_date: Date;

  @IsString()
  @ApiProperty()
  genero: string;

  @IsNumber()
  @ApiProperty()
  phonesNumber: number;
}
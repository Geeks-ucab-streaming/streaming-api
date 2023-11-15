import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
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
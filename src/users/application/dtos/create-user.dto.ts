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
  gender: string;

  @IsString()
  @ApiProperty()
  suscriptionState: string; 

  @IsNumber()
  @ApiProperty()
  phone: number;
}
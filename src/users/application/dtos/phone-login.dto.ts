import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';

export class loginPhoneDto {
  @IsNumber()
  @ApiProperty()
  phonesNumber: number;
}
import { ApiHeaders, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  phone: string;

  //@IsString()
  @Optional()
  token: string;

}
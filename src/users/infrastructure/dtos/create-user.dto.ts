import { ApiHeaders, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ICreateUserDto } from 'src/common/Application/dtoPorts/createUserDtoPort';

export class CreateUserDto implements ICreateUserDto {

  @IsString()
  @ApiProperty()
  phone: string;

  //@IsString()
  @Optional()
  token: string;

}
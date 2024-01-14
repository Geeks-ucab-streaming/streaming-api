import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, IsEmail, IsIn } from 'class-validator';
import { Check } from 'typeorm';

export class  UpdateUserDto{

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birth_date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['M', 'F'], { message: 'Value must be M or F' })
  gender?: string;

}
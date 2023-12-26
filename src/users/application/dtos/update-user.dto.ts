import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, IsEmail } from "class-validator";

export class  UpdateUserDto{

  @IsOptional()
  @IsString()
  name?: string;

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
  gender?: string;

}
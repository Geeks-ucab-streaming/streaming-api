import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate, IsOptional } from "class-validator";

export class UpdateUserDto{

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
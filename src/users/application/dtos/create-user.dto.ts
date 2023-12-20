import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  suscriptionState: string; 

  @IsNumber()
  @ApiProperty()
  phone: number;
  
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';
import { PhoneDto } from 'src/phones/application/dtos/phone.dto';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  suscriptionState: string; 

  @IsNumber()
  @ApiProperty()
  phone: number;

}
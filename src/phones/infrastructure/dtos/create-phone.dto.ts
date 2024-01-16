import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePhoneDto {
  @IsNumber()
  @ApiProperty({ description: 'The name of the phone' })
  phoneNumber: number;
}

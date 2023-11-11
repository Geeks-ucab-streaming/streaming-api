import {IsNumber} from "class-validator";

export class CreatePhoneDto{
  @IsNumber()
  phoneNumber: number;
}
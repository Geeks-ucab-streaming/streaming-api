import { Expose } from "class-transformer"

export class PhoneDto{
  @Expose()
  id: number;

  @Expose()
  phoneNumber:number;
}
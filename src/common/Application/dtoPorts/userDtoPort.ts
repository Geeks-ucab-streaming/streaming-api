import { IPhoneDto } from "./phoneDtoPort";

export interface IUserDto {

  id: string;
  email: string;
  name: string;
  birth_date: Date;
  gender: string;
  phone: IPhoneDto;
  token: string[];

}
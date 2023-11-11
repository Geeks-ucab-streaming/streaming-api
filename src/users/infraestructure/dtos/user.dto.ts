import { Expose } from "class-transformer"

export class UserDto{

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  birth_date: Date;

  @Expose()
  genero: string;

  @Expose()
  phonesNumber: number;
  
}
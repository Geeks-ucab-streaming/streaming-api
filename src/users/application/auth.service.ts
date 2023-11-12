import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../application/services/users.service";
import { User } from "../infrastructure/users.entity";


@Injectable()
export class AuthService{
  constructor(private usersService: UsersService){}

  async signup(phoneNumber: number){
    //Ver si el email está ya en uso
    //Crear nuevo usuario y guardarlo
    const user = await this.usersService.create(phoneNumber);

    //Retornar el usuario
    return user;
  }

  async signin(id:number){
    //Desestructuración
    const [user] = await this.usersService.find(id);
    if(!user){
      throw new NotFoundException ("User not found");
    }
    return user;
  }
}
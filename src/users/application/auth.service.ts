import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../application/services/users.service";
import { CreateUserDto } from "../application/dtos/create-user.dto";
import { PhonesNumber } from "../domain/value-objects/phoneNumber";
import { Entity } from "src/common/domain/Entity/entity";


@Injectable()
export class AuthService{
  constructor(private usersService: UsersService){}

  async signup(users: CreateUserDto){
    //Ver si el email está ya en uso
    const userPhpne = new PhonesNumber(users.phonesNumber);
    //Crear nuevo usuario y guardarlo
    const user = await this.usersService.create(users);
    //Retornar el usuario
    return user;
  }

  async signin(id:string){
    //Desestructuración
    const [user] = await this.usersService.find(id);
    if(!user){
      throw new NotFoundException ("User not found");
    }
    return user;
  }
}
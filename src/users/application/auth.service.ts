import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../application/services/users.service";
import { CreateUserDto } from "../application/dtos/create-user.dto";
import { PhonesNumber } from "../domain/value-objects/phoneNumber";
import { User } from "../domain/user";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService{
  constructor(private usersService: UsersService){}

  async signup(users: CreateUserDto){
    const usuario = new User(
      uuidv4(),
      users.email,
      users.name,
      users.birth_date,
      users.genero,
      new PhonesNumber(users.phonesNumber),
      
    )
    //Crear nuevo usuario y guardarlo
    const user = await this.usersService.create(usuario);
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



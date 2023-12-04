import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PhonesNumber } from "../domain/userAggregate/value-objects/phoneNumber";
import { User } from "../domain/userAggregate/user";
import { v4 as uuidv4 } from 'uuid';
import { PhonesService } from "src/phones/application/services/phones.service";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { findByPhoneUserService } from "src/phones/application/services/find-by-phone-user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
  constructor(private usersService: UsersService, private phone:PhonesService,
    private findByPhoneUserService: findByPhoneUserService,
    private jwtService: JwtService
    ){}

  async signup(users: CreateUserDto){
    const phone = await this.phone.execute(new PhoneDto(uuidv4(), users.phonesNumber));
    /*let usuario = new User(
      uuidv4(),
      users.name,
      users.birth_date,
      users.genero,
      users.suscriptionState,
      new PhonesNumber(users.phonesNumber),
      phone
    );

    //Crear nuevo usuario y guardarlo
    const user = await this.usersService.create(usuario);

    //Retornar el usuario
    return user;*/
  }

  async signin(phone: number){
    //validation by operator in service
    //validation if user exists
    const users = await this.findByPhoneUserService.execute(phone); 
    if(!users){
      throw new NotFoundException ("User not found");
      //MANEJAR OPTIONAL
    }
    
    //generar token
    const payload = {phone: users.id,id: users.id, name: users.name};
    const token = this.jwtService.sign(payload);
    
    //permitir al usuario aplicar el login
    return {users, token};
  }
}
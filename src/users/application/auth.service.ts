import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "../domain/userAggregate/user";
import { v4 as uuidv4 } from 'uuid';
import { PhonesService } from "src/phones/application/services/phones.service";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { findByPhoneUserService } from "src/phones/application/services/find-by-phone-user.service";
import { Phone } from "src/phones/domain/value-objects/phone";
import { userName } from "../domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "../domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "../domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "../domain/userAggregate/value-objects/userSuscriptionState";
import { userId } from "../domain/userAggregate/value-objects/userId";
import { throws } from "assert";

@Injectable()
export class AuthService{
  constructor(private usersService: UsersService, 
    private phone:PhonesService,
    private findByPhoneUserService: findByPhoneUserService,
    ){}

  async signup(users: CreateUserDto){
    const phone = await this.phone.execute(new PhoneDto(uuidv4(), users.phonesNumber,null));
  //TODO: CREAR LOS CREATES DE CADA VO, NO INSTANCIAR, ENCAPSULAR CREACION DE OBJETOS
  console.log(users,"aque llega algo")
    let usuario = User.create(
      new userId(uuidv4()),
      new userName(users.name),
      new UserBirthDate(new Date (users.birth_date),2000),
      new UserGender(users.genero)  ,
      new userSuscriptionState(users.suscriptionState) ,
      phone,
    );

    //Crear nuevo usuario y guardarlo
    const user = await this.usersService.create(usuario);

    //Retornar el usuario
    return user;
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
    //permitir al usuario aplicar el login
    return payload;
  }
}
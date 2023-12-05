import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "../domain/userAggregate/user";
import { v4 as uuidv4 } from 'uuid';
import { PhonesService } from "src/phones/application/services/phones.service";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { findByPhoneUserService } from "src/phones/application/services/find-by-phone-user.service";
import { Imapper } from "src/core/application/IMapper";
import { UserEntity } from "../infrastructure/users.entity";
import { userName } from "../domain/userAggregate/value-objects/userName";
import { userId } from "../domain/userAggregate/value-objects/userId";
import { UserBirthDate } from "../domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "../domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "../domain/userAggregate/entities/userSuscriptionState";

@Injectable()
export class AuthService{
  constructor(private usersService: UsersService, 
    private phone:PhonesService,
    private findByPhoneUserService: findByPhoneUserService,
    private IMapper: Imapper<User,UserEntity>,
    ){}

  async signup(usersDto: CreateUserDto){
    const phone = await this.phone.execute(new PhoneDto(uuidv4(), usersDto.phone,null));
    
    let usuario = new User(
      new userId (uuidv4())
    , new userName(usersDto.name)
    , new UserBirthDate(usersDto.birth_date, usersDto.birth_date.getFullYear())
    , new UserGender(usersDto.gender)
    , new userSuscriptionState(usersDto.suscriptionState)
    , phone)

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
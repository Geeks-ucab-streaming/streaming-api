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
import { Phone, phoneNumber } from "src/phones/domain/value-objects/phone";
import { Line } from "src/phones/domain/value-objects/line";


@Injectable()
export class AuthService{
  constructor(private usersService: UsersService, 
    private phone:PhonesService,
    private findByPhoneUserService: findByPhoneUserService,
    private IMapper: Imapper<User,UserEntity>,
    ){}

  async signup(usersDto: CreateUserDto){
    const users = await this.findByPhoneUserService.execute(usersDto.phone); 
    console.log(users)
    if(users.Value){
      throw new NotFoundException ("User Alredy exists");
    }
    const phone = await this.phone.execute( Phone.create(uuidv4(),usersDto.phone,uuidv4(),usersDto.phone.toString().substring(0, 3) ));
    console.log(phone)
    let year = new Date (usersDto.birth_date);
    let usuario = new User(
      uuidv4()
    , usersDto.name
    , year
    ,  usersDto.gender
    , usersDto.suscriptionState
    , phone.Value)

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
    const payload = {phone: users.value.id,id: users.value.id, name: users.value.name};    
    //permitir al usuario aplicar el login
    return payload;
  }
}
import { userSuscriptionState } from "../userAggregate/value-objects/userSuscriptionState";
import { User } from "../userAggregate/user";
import { userId } from "../userAggregate/value-objects/userId";
import { UserPhoneFactory } from "./user-phone.factory";
import { CreateUserDto } from "src/users/application/dtos/create-user.dto";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";
import { v4 as uuidv4 } from 'uuid';
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { userEmail } from "../userAggregate/value-objects/userEmail";
import { UserDto } from "src/users/application/dtos/user.dto";
import { userName } from "../userAggregate/value-objects/userName";
import { UserBirthDate } from "../userAggregate/value-objects/userBirthDate";
import { UserGender } from "../userAggregate/value-objects/userGender";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";
import { PhoneEntity } from "src/phones/infrastructure/entities/phones.entity";

export class UserFactory {
 
  public static userFactoryMethod(user :CreateUserDto, userPhone: PhoneDto): User {
  
    let usuario = User.create(
      userId.create(uuidv4())
    , UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(userPhone.id,userPhone.phoneNumber,userPhone.linePhoneId,userPhone.lineName))
    , userSuscriptionState.create("premium",new Date(Date.now()))
    , null        
     ) 
    return usuario;
  }
  
  public static userOptionalParametersFactory (user:UserEntity, userPhone: PhoneEntity): User{

    let usuario = User.create(
      userId.create(uuidv4())
    , UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(userPhone.id,userPhone.phoneNumber,userPhone.linePhone.id,userPhone.linePhone.name))
    , userSuscriptionState.create("premium",new Date(Date.now()))
    , null        
     ) 

    if(user.email){
      usuario.updateUsersEmail(userEmail.create(user.email));
    }
    
    if(user.name){
      usuario.updateUsersName(userName.create(user.name));
    }

    if(user.birth_date){
      let birthDate = new Date(user.birth_date);
      usuario.updateUsersBirthDate(UserBirthDate.create(birthDate, birthDate.getFullYear()));
    }

    if(user.gender){
      usuario.updateUsersGender(UserGender.create(user.gender));
    }
     
    return usuario;
  }
}


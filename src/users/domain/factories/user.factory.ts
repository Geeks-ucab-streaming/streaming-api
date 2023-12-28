import { userSuscriptionState } from "../userAggregate/entities/userSuscriptionState";
import { User } from "../userAggregate/user";
import { userId } from "../userAggregate/value-objects/userId";
import { UserPhoneFactory } from "./user-phone.factory";
import { CreateUserDto } from "src/users/application/dtos/create-user.dto";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";
import { v4 as uuidv4 } from 'uuid';
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { PhoneDto } from "src/phones/application/dtos/phone.dto";
import { userEmail } from "../userAggregate/value-objects/userEmail";

export class UserFactory {
 

  public static userFactoryMethod(user :CreateUserDto, userPhone: PhoneDto): User {
  
    let usuario = new User(
      userId.create(uuidv4())
    , UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(userPhone.id,userPhone.phoneNumber,userPhone.linePhoneId,userPhone.lineName))
    , userSuscriptionState.create("premium", /*CAMBIAR POR LO REAL*/ new Date(Date.now()))
    , null        
     )
     
    return usuario;
    }
}


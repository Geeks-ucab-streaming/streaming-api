import { userSuscriptionState } from "../userAggregate/value-objects/userSuscriptionState";
import { User } from "../userAggregate/user";
import { userId } from "../userAggregate/value-objects/userId";
import { UserPhoneFactory } from "./user-phone.factory";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";
import { v4 as uuidv4 } from 'uuid';
import { userEmail } from "../userAggregate/value-objects/userEmail";
import { userName } from "../userAggregate/value-objects/userName";
import { UserBirthDate } from "../userAggregate/value-objects/userBirthDate";
import { UserGender } from "../userAggregate/value-objects/userGender";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";


export class UserFactory {
 
  public static userFactoryMethod(phoneId: string, phoneNumber: string, 
    linesPhoneId: string, linesName: string): User {
  
    let usuario = User.create(
      userId.create(uuidv4())
    , UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(phoneId,phoneNumber,linesPhoneId,linesName))
    , userSuscriptionState.create("premium",new Date(Date.now()))
    , null        
     ) 
    return usuario;
  }
}


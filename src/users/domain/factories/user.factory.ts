import { userSuscriptionState } from "../userAggregate/value-objects/userSuscriptionState";
import { User } from "../userAggregate/user";
import { userId } from "../userAggregate/value-objects/userId";
import { UserPhoneFactory } from "./user-phone.factory";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";
import { v4 as uuidv4 } from 'uuid';
import { Token } from '../userAggregate/value-objects/token';


export class UserFactory {
 
  public static userFactoryMethod(phoneId: string, phoneNumber: string, 
    linesPhoneId: string, linesName: string, token:string, suscription: string): User {
    const userUUID = uuidv4();
    let usuario = User.create(
      userId.create(userUUID)
    , UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(phoneId,phoneNumber,linesPhoneId,linesName))
    , userSuscriptionState.create(suscription,new Date(Date.now()))
    , [Token.create(token,userUUID)]
     ) 
    return usuario;
  }
}


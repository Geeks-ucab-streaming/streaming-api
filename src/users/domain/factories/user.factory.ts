import { Factory } from "src/common/domain/factories/icreator.interface";
import { userSuscriptionState } from "../userAggregate/entities/userSuscriptionState";
import { User } from "../userAggregate/user";
import { userId } from "../userAggregate/value-objects/userId";
import { UserPhoneFactory } from "./user-phone.factory";
import { CreateUserDto } from "src/users/application/dtos/create-user.dto";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";
import { v4 as uuidv4 } from 'uuid';

export class UserFactory implements Factory<CreateUserDto,User>{
  

  public factoryMethod(user :CreateUserDto): User {
    
    let phone: UserPhoneFactory = new UserPhoneFactory();
    let usuario = new User(
      userId.create(uuidv4())
    , phone.factoryMethod(new PhoneParameterObject(uuidv4(),user.phone,uuidv4(),user.phone.toString().substring(0,3)))
    , userSuscriptionState.create(user.suscriptionState)
     )
     
    return usuario;
    }
}


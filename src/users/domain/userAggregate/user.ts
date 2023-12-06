import { PhonesNumber } from "./value-objects/phoneNumber";
import { PhoneEntity } from "src/phones/infrastructure/phones.entity";
import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./entities/userSuscriptionState";
import { Phone } from "src/phones/domain/value-objects/phone";

export class User {
  id: userId;
  name: userName;
  birth_date: UserBirthDate;
  gender: UserGender;
  suscriptionState: userSuscriptionState;
  phone: Phone ;


  constructor(
    id: string,
    name: string,
    birth_date: Date,
    gender: string,
    suscriptionState: string,
    phone:  Phone,

  ) {
    this.id = new userId(id); 
    this.name = new userName(name);
    this.birth_date = new UserBirthDate(birth_date, birth_date.getFullYear());
    this.gender = new UserGender(gender);
    this.suscriptionState = new userSuscriptionState(suscriptionState);
    this.phone = phone;

  }

  static create(
    id: string,
    name: string,
    birth_date: Date,
    gender: string,
    suscriptionState: string,
    phone:  Phone,

  ): User {
    return new User(
      id, name, birth_date, gender, suscriptionState, phone);
  }
}

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
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    gender: UserGender,
    suscriptionState: userSuscriptionState,
    phone:  Phone,

  ) {
    this.id = id; 
    this.name = name;
    this.birth_date = birth_date;
    this.gender = gender;
    this.suscriptionState = suscriptionState;
    this.phone = phone;

  }

  static create(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    gender: UserGender,
    suscriptionState: userSuscriptionState,
    phone:  Phone,
  ): User {
    return new User(id, name, birth_date, gender, suscriptionState, phone);
  }
}

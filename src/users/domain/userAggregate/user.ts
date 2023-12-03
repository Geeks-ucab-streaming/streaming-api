import { PhonesNumber } from "./value-objects/phoneNumber";
import { PhoneEntity } from "src/phones/infrastructure/phones.entity";
import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./value-objects/userSuscriptionState";

export class User {
  id: userId;
  name: userName;
  birth_date: UserBirthDate;
  genero: UserGender;
  suscriptionState: userSuscriptionState;
  phonesNumber: PhonesNumber ;
  phone: PhoneEntity;

  constructor(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    genero: UserGender,
    suscriptionState: userSuscriptionState,
    phonesNumber:  PhonesNumber,
    phone: PhoneEntity,
  ) {
    this.id = id;
    this.name = name;
    this.birth_date = birth_date;
    this.genero = genero;
    this.suscriptionState = suscriptionState;
    this.phonesNumber = phonesNumber;
    this.phone = phone;
  }
}

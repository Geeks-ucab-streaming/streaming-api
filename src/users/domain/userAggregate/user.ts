/*import { PhonesNumber } from "./value-objects/phoneNumber";
import { PhoneEntity } from "src/phones/infrastructure/phones.entity";
import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./value-objects/userSuscriptionState";
import { Phone } from "src/phones/domain/value-objects/phone";

export class User {
  id: userId;
  name: userName;
  birth_date: UserBirthDate;
  genero: UserGender;
  suscriptionState: userSuscriptionState;
  phonesNumber: Phone ;


  constructor(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    genero: UserGender,
    suscriptionState: userSuscriptionState,
    phonesNumber:  Phone,

  ) {
    this.id = id; 
    this.name = name;
    this.birth_date = birth_date;
    this.genero = genero;
    this.suscriptionState = suscriptionState;
    this.phonesNumber = phonesNumber;

  }

  static create(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    genero: UserGender,
    suscriptionState: userSuscriptionState,
    phonesNumber:  Phone,
  ): User {
    return new User(id, name, birth_date, genero, suscriptionState, phonesNumber);
  }
}
*/
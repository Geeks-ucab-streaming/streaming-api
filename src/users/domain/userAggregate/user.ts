import { Phone } from "src/phones/domain/phone";
import { PhonesNumber } from "./value-objects/phoneNumber";
import { PhoneEntity } from "src/phones/infrastructure/phones.entity";
import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
export class User {
  id: userId;
  name: userName;
  birth_date: UserBirthDate;
  genero: UserGender;
  phonesNumber: PhonesNumber ;
  phone: PhoneEntity;

  constructor(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    genero: UserGender,
    phonesNumber:  PhonesNumber,
    phone: PhoneEntity,
  ) {
    this.id = id;
    this.name = name;
    this.birth_date = birth_date;
    this.genero = genero;
    this.phonesNumber = phonesNumber;
    this.phone = phone;
  }
}

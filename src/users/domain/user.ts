import { Phone } from 'src/phones/domain/phone';
import { PhonesNumber } from './value-objects/phoneNumber';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
export class User {
  id: string;
  name: string;
  birth_date: Date;
  genero: string;
  phonesNumber: PhonesNumber;
  phone: PhoneEntity;

  constructor(
    id: string,
    name: string,
    birth_date: Date,
    genero: string,
    phonesNumber: PhonesNumber,
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

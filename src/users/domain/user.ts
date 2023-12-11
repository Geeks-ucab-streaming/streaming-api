
import { Phone } from "src/phones/domain/value-objects/phone";

export class User {
  id: string;
  name: string;
  birth_date: Date;
  genero: string;
  phonesNumber: Phone ;


  constructor(
    id: string,
    name: string,
    birth_date: Date,
    genero: string,
    phonesNumber:  Phone,
  ) {
    this.id = id;
    this.name = name;
    this.birth_date = birth_date;
    this.genero = genero;
    this.phonesNumber = phonesNumber;
  }
}

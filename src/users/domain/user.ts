export class User {
  id: string;
  email: string;
  name: string;
  birth_date: Date;
  genero: string;
  phonesNumber: number;

  constructor(
    id: string,
    email: string,
    name: string,
    birth_date: Date,
    genero: string,
    phonesNumber: number,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.birth_date = birth_date;
    this.genero = genero;
    this.phonesNumber = phonesNumber;
  }
}

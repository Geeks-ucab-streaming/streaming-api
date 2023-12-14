import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./entities/userSuscriptionState";
import { Phone } from "src/phones/domain/value-objects/phone";
import { get } from "http";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { UserCreated } from "./events/user-created";

export class User /*extends AggregateRoot<userId> */{
  id: userId;
  name: userName;
  birth_date: UserBirthDate;
  gender: UserGender;
  suscriptionState: userSuscriptionState;
  phone: Phone ;

  //OJO: Evaluar el protected en la definición del constructor
   constructor(id: userId, name: userName, birthDate: UserBirthDate, gender: UserGender, suscriptionState: userSuscriptionState, phone: Phone) {
    const userCreated = UserCreated.create(id, name, birthDate, gender, suscriptionState, phone);
    /*super(id, userCreated);*/
  } 

  static create(id: userId, name: userName, birthDate: UserBirthDate, gender: UserGender, suscriptionState: userSuscriptionState, phone: Phone): User {
    return new User(id, name, birthDate, gender, suscriptionState,phone);
  }
  
  //Getters
  getId(): userId  {
    return this.id; 
  }

  getName(): userName {
    return this.name;
  } 

  getBirthDate(): UserBirthDate {
    return this.birth_date;
  }   

  getGender(): UserGender {
    return this.gender;
  }

  getSuscriptionState():userSuscriptionState {
    return this.suscriptionState;
  }

  getPhone(): Phone {
    return this.phone;
  }

}

import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./entities/userSuscriptionState";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { get } from "http";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { UserCreated } from "./events/user-created";
import { DomainEvent } from "src/common/domain/Event/domain-event";

export class User extends AggregateRoot<userId> {
  private name: userName;
  private birth_date: UserBirthDate;
  private gender: UserGender;
  private suscriptionState: userSuscriptionState;
  private phone: Phone ;

  //OJO: Evaluar el protected en la definición del constructor
   constructor(id: userId, name: userName, birthDate: UserBirthDate, gender: UserGender, suscriptionState: userSuscriptionState, phone: Phone) {
    const userCreated = UserCreated.create(id, name, birthDate, gender, suscriptionState, phone);
    super(id, userCreated);
  } 

  static create(id: userId, name: userName, birthDate: UserBirthDate, gender: UserGender, suscriptionState: userSuscriptionState, phone: Phone): User {
    return new User(id, name, birthDate, gender, suscriptionState,phone);
  }
  
  get Name(): userName {
    return this.name;
  } 

  get BirthDate(): UserBirthDate {
    return this.birth_date;
  }   

  get Gender(): UserGender {
    return this.gender;
  }

  get SuscriptionState():userSuscriptionState {
    return this.suscriptionState;
  }

  get Phone(): Phone {
    return this.phone;
  }

  
  //asignando estado
  protected when(event: DomainEvent): void {
   console.log(event);
  }

  //validando estado
  protected ensureValidState(): void {
    console.log("Falta este método por implementar");
  }

}

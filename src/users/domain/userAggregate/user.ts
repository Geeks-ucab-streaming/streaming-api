import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./entities/userSuscriptionState";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { UserCreated } from "../events/user-created";
import { DomainEvent } from "src/common/domain/Event/domain-event";
import { calculateHowOldYouAre } from "../../domain/services/calculateHowOldYouAre";
import { calculateHowYoungYouAre } from "../../domain/services/calculateHowYoungYouAre";
import { userEmail } from "./value-objects/userEmail";
import { TokenEntity } from './entities/token';

export class User extends AggregateRoot<userId> {
  private name: userName;
  private email: userEmail;
  private birth_date: UserBirthDate;
  private gender: UserGender;
  private suscriptionState: userSuscriptionState;
  private phone: Phone ;
  private token : TokenEntity[];

  //OJO: Evaluar el protected en la definición del constructor
    constructor(id: userId, phone: Phone , suscriptionState: userSuscriptionState, token?: TokenEntity[]) {
    const userCreated = UserCreated.create(id, phone ,suscriptionState,token);
    super(id, userCreated);
  } 

  static create(id: userId, phone: Phone , suscriptionState: userSuscriptionState,token?:TokenEntity[], name?: userName, birthDate?: UserBirthDate, gender?: UserGender): User {
    return new User(id, phone ,suscriptionState,token);
  }

  public createUser(id: userId, phone: Phone ,suscriptionState: userSuscriptionState,token?:TokenEntity[]) {
    this.apply(UserCreated.create(id, phone , suscriptionState,token));
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

  static validateRangeBirthDate(birthDate: UserBirthDate, yearBirthUser:number): UserBirthDate {
  if (birthDate){
    if (birthDate.BirthDate <= calculateHowOldYouAre.ValidateYear(birthDate.BirthDate) && birthDate.BirthDate >= calculateHowYoungYouAre.ValidateYear(birthDate.BirthDate)) {
      return birthDate; //Retorna la fecha de nacimiento si cumple con la condición
    }
   }
   return null;
  }

  //asignando estado
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
        case UserCreated:
            const userCreated: UserCreated = event as UserCreated;
            this.suscriptionState = userCreated.suscriptionState;
            this.phone = userCreated.phone;
            this.token = userCreated.token;
            break;
        default:
          throw new Error("Event not implemented.");
    }
}
  
  //validando estado
  protected ensureValidState(): void {
    console.log("Falta este método por implementar (ensureValidState en user)");
  }

}

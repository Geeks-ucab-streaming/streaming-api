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
import { UserEmailUpdated } from "../events/user-email-updated";
import { UserNameUpdated } from "../events/user-name-updated";
import { UserBirthDateUpdated } from "../events/user-birthDate-updated";
import { UserGenderUpdated } from "../events/user-gender-updated";


export class User extends AggregateRoot<userId> {
  private name: userName;
  private email: userEmail;
  private birth_date: UserBirthDate;
  private gender: UserGender;
  private suscriptionState: userSuscriptionState;
  private phone: Phone ;

  //OJO: Evaluar el protected en la definición del constructor
    constructor(id: userId, phone: Phone , suscriptionState: userSuscriptionState) {
    const userCreated = UserCreated.create(id, phone ,suscriptionState);
    super(id, userCreated);
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

  get Email(): userEmail {
    return this.email;
  }

  get Phone(): Phone {
    return this.phone;
  }

  static create(id: userId, phone: Phone , suscriptionState: userSuscriptionState, email?: userEmail,name?: userName, birthDate?: UserBirthDate, gender?: UserGender): User {
    return new User(id, phone ,suscriptionState);
  }

  public createUser(id: userId, phone: Phone ,suscriptionState: userSuscriptionState) {
    this.apply(UserCreated.create(id, phone , suscriptionState));
  }

  public updateUsersEmail (id: userId, email: userEmail) {
    this.apply(UserEmailUpdated.create(id, email));
  }

  public updateUsersName (id: userId, name: userName) {
    this.apply(UserNameUpdated.create(id, name));
  }

  public updateUsersBirthDate (id: userId,  birthDate: UserBirthDate) {
    this.apply(UserBirthDateUpdated.create(id, birthDate));
  }

  public updateUsersGender (id: userId, gender: UserGender) {
    this.apply(UserGenderUpdated.create(id, gender));
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
            break;
        case UserEmailUpdated:
            const userEmailUpdated: UserEmailUpdated = event as UserEmailUpdated;
            this.email = userEmailUpdated.email;
            break;
        case UserNameUpdated:
            const userNameUpdated: UserNameUpdated = event as UserNameUpdated;
            this.name = userNameUpdated.name;
            break;
        case UserGenderUpdated:
            const userGenderUpdated: UserGenderUpdated = event as UserGenderUpdated;
            this.gender = userGenderUpdated.gender;
            break;
        case UserBirthDateUpdated:
            const userBirthDateUpdated: UserBirthDateUpdated = event as UserBirthDateUpdated;
            this.birth_date = userBirthDateUpdated.birthDate;
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

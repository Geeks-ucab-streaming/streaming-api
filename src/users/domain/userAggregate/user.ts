import { UserBirthDate } from "./value-objects/userBirthDate";
import { userName } from "./value-objects/userName";
import { UserGender } from "./value-objects/userGender";
import { userId } from "./value-objects/userId";
import { userSuscriptionState } from "./value-objects/userSuscriptionState";
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
import { InvalidUserException } from "../exceptions/invalid-user.exception";
import { TokenEntity } from './entities/token';
import { UserSuscriptionUpdated } from "../events/user-suscription-updated";

export class User extends AggregateRoot<userId> {
  private name: userName;
  private email: userEmail;
  private birth_date: UserBirthDate;
  private gender: UserGender;
  private suscriptionState: userSuscriptionState;
  //AQUI DEBE IR LA FECHA DE LA SUSCRIPCION O ADENTRO DEL CREATE
  private phone: Phone;
  private token : TokenEntity[];

  //OJO: Evaluar el protected en la definición del constructor
    constructor(id: userId, phone: Phone , suscriptionState: userSuscriptionState, token?: TokenEntity[]) {
    const userCreated = UserCreated.create(id, phone ,suscriptionState,token);
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

  get Token(): TokenEntity[] {
    return this.token;
  }

  static create(id: userId, phone: Phone , suscriptionState: userSuscriptionState,token?:TokenEntity[], email?: userEmail,name?: userName, birthDate?: UserBirthDate, gender?: UserGender): User {
    return new User(id, phone ,suscriptionState,token);
  }

  public createUser(id: userId, phone: Phone ,suscriptionState: userSuscriptionState,token?:TokenEntity[]) {
    this.apply(UserCreated.create(id, phone , suscriptionState,token));
  }

  public updateUsersEmail (email: userEmail) {
    this.apply(UserEmailUpdated.create(this.Id, email));
  }

  public updateUsersSuscriptionState (suscription: userSuscriptionState) {
    this.apply(UserSuscriptionUpdated.create(this.Id, suscription));
  }

  public updateUsersName (name: userName) {
    this.apply(UserNameUpdated.create(this.Id, name));
  }

  public updateUsersBirthDate (birthDate: UserBirthDate) {
    this.apply(UserBirthDateUpdated.create(this.Id, birthDate));
  }

  public updateUsersGender (gender: UserGender) {
    this.apply(UserGenderUpdated.create(this.Id, gender));
  }

  static validateRangeBirthDate(birthDate: UserBirthDate, yearBirthUser:number): UserBirthDate {
  if (birthDate){
    if (birthDate.BirthDate >= calculateHowOldYouAre.ValidateYear(new Date(Date.now())) && birthDate.BirthDate <= calculateHowYoungYouAre.ValidateYear(new Date(Date.now()))) {
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
        case UserSuscriptionUpdated:
            const userSuscriptionUpdated: UserSuscriptionUpdated= event as UserSuscriptionUpdated;
            this.suscriptionState = userSuscriptionUpdated.suscription;
            break;
        default:
          throw new Error("Event not implemented.");
    }
}
  
  //validando estado
  protected ensureValidState(): void {
    if (!this.Id || !this.Phone) {
      throw new InvalidUserException(this);
   }
  }
}

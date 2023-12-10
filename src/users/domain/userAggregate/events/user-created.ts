import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../value-objects/userId";
import { userName } from "../value-objects/userName";
import { UserBirthDate } from "../value-objects/userBirthDate";
import { UserGender } from "../value-objects/userGender";
import { userSuscriptionState } from "../entities/userSuscriptionState";
import { Phone } from "src/phones/domain/value-objects/phone";

export class UserCreated extends DomainEvent {
  protected constructor(
    id: userId,
    name: userName,
    birth_date: UserBirthDate,
    gender: UserGender,
    suscriptionState: userSuscriptionState,
    phone: Phone
    ) {
    super();
    }

  static create(id: userId, name: userName, birthDate: UserBirthDate, gender: UserGender, suscriptionState: userSuscriptionState, phone: Phone): UserCreated {
      return new UserCreated(id, name, birthDate, gender, suscriptionState, phone);
  }
}


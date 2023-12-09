import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { userName } from "../userAggregate/value-objects/userName";
import { UserBirthDate } from "../userAggregate/value-objects/userBirthDate";
import { UserGender } from "../userAggregate/value-objects/userGender";
import { userSuscriptionState } from "../userAggregate/entities/userSuscriptionState";
import { Phone } from "src/phones/domain/phoneAggregate/phone";

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

  static create(id: userId,  phone: Phone, name?: userName, birthDate?: UserBirthDate, gender?: UserGender, suscriptionState?: userSuscriptionState): UserCreated {
      return new UserCreated(id, name, birthDate, gender, suscriptionState, phone);
  }
}


import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { userName } from "../userAggregate/value-objects/userName";
import { UserBirthDate } from "../userAggregate/value-objects/userBirthDate";
import { UserGender } from "../userAggregate/value-objects/userGender";
import { userSuscriptionState } from "../userAggregate/entities/userSuscriptionState";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { TokenEntity } from '../userAggregate/entities/token';

export class UserCreated extends DomainEvent {
  protected constructor(
    public id: userId,
    public phone: Phone,
    public suscriptionState: userSuscriptionState,
    public token?: TokenEntity[],
    ) {
    super();
    }

  static create(id: userId,  phone: Phone, suscriptionState: userSuscriptionState, token:TokenEntity[]): UserCreated {
      return new UserCreated(id, phone, suscriptionState,token);
  }
}


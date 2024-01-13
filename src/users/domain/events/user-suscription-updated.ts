import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { userSuscriptionState } from "../userAggregate/value-objects/userSuscriptionState";

export class UserSuscriptionUpdated extends DomainEvent {
    protected constructor(
        public id: userId,
        public suscription: userSuscriptionState
    ) {
      super();
    }

    public static create(id: userId, userSuscription: userSuscriptionState): UserSuscriptionUpdated{
        return new UserSuscriptionUpdated(id, userSuscription);
    }
}
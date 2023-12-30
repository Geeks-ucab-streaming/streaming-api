import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { userEmail } from "../userAggregate/value-objects/userEmail";


export class UserEmailUpdated extends DomainEvent {
    protected constructor(
        public id: userId,
        public email: userEmail
    ) {
      super();
    }

    public static create(id: userId, email: userEmail): UserEmailUpdated{
        return new UserEmailUpdated(id, email);
    }
}
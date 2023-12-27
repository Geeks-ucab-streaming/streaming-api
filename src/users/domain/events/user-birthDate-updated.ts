import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { UserBirthDate } from "../userAggregate/value-objects/userBirthDate";


export class UserBirthDateUpdated extends DomainEvent {
    protected constructor(
        public id: userId,
        public birthDate: UserBirthDate
    ) {
      super();
    }

    public static create(id: userId, birthDate: UserBirthDate): UserBirthDateUpdated{
        return new UserBirthDateUpdated(id, birthDate);
    }
}
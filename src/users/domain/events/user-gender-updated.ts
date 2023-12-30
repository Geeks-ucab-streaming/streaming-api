import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { UserGender } from "../userAggregate/value-objects/userGender";

export class UserGenderUpdated extends DomainEvent {
    protected constructor(
        public id: userId,
        public gender: UserGender
    ) {
      super();
    }

    public static create(id: userId, gender: UserGender): UserGenderUpdated{
        return new UserGenderUpdated(id, gender);
    }
}
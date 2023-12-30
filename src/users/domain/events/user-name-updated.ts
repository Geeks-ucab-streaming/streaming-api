import { DomainEvent } from "src/common/domain/Event/domain-event";
import { userId } from "../userAggregate/value-objects/userId";
import { userName } from "../userAggregate/value-objects/userName";


export class UserNameUpdated extends DomainEvent {
    protected constructor(
        public id: userId,
        public name: userName
    ) {
      super();
    }

    public static create(id: userId, name: userName): UserNameUpdated{
        return new UserNameUpdated(id, name);
    }
}
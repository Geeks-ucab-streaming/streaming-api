import { DomainEvent } from "src/common/domain/Event/domain-event";
import { phoneId } from "../phoneAggregate/value-objects/phoneId";
import { phoneNumber } from "../phoneAggregate/value-objects/phoneNumber";
import { Line } from "../phoneAggregate/value-objects/line";

export class PhoneCreated extends DomainEvent {

  protected constructor(
    public id : phoneId,
    public userPhoneNumber : phoneNumber,
    public linePhone : Line,
    ) {
    super();
    }

  static create(id: phoneId, userPhoneNumber: phoneNumber, linePhone: Line ): PhoneCreated {
    return new PhoneCreated(id,userPhoneNumber,linePhone);
  }
}
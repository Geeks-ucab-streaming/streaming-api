import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { phoneNumber } from "../phoneAggregate/value-objects/phoneNumber";

export class PhoneInvalidExceptions extends DomainException<number> {
    constructor(phone: number) {
       super(phone,"Invalid phone operator", "PhoneInvalidExceptions", 400);
    }
}
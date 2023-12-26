import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { phoneNumber } from "../phoneAggregate/value-objects/phoneNumber";

export class PhoneInvalidExceptions extends DomainException<string> {
    constructor(phone: string) {
       super(phone,"Invalid phone operator", "PhoneInvalidExceptions", 400);
    }
}
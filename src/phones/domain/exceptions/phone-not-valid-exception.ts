import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { phoneNumber } from "../phoneAggregate/phone";

export class PhoneInvalidExceptions extends DomainException<phoneNumber> {
    constructor(phone: phoneNumber) {
       super(phone,"Invalid phone operator", "PhoneInvalidExceptions", 400);
    }
}
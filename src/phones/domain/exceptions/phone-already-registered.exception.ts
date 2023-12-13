import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { phoneNumber } from "../phoneAggregate/value-objects/phoneNumber";

export class PhoneRegistedAlredyExceptions extends DomainException<phoneNumber> {
    constructor(phone:phoneNumber) {
       super(phone,"Phone Number Already Registered", "PhoneRegistedAlredyExceptions", 404);
    }
}
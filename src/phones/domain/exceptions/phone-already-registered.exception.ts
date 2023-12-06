import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { Phone, phoneNumber } from "../value-objects/phone";

export class PhoneRegistedAlredyExceptions extends DomainException<phoneNumber> {
    constructor(phone:phoneNumber) {
       super(phone,"Phone Number Already Registered", "PhoneRegistedAlredyExceptions", 404);
    }
}
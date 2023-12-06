import { DomainException } from "src/common/domain/domain.exceptions";

export class PhoneRegistedAlredyExceptions extends DomainException {
    constructor() {
       super("Phone Number Already Registered", "PhoneRegistedAlredyExceptions", 404);
    }
}
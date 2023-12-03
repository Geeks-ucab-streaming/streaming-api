import { DomainException } from "src/common/domain/domain.exceptions";

export class PhoneInvalidExceptions extends DomainException {
    constructor() {
       super("Invalid phone operator", "PhoneInvalidExceptions", 400);
    }
}
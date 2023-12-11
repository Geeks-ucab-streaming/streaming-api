import { DomainException } from "src/common/domain/domain.exceptions";

export class LineInvalidExceptions extends DomainException {
    constructor() {
       super("Invalid Line phone", "LineInvalidExceptions", 400);
    }
}
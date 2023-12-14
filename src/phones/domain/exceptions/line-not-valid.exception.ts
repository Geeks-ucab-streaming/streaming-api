
import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { Line } from "../value-objects/line";

export class LineInvalidExceptions extends DomainException<Line> {
    constructor(line: Line) {
       super(line,"Invalid Line phone", "LineInvalidExceptions", 400);
    }
}
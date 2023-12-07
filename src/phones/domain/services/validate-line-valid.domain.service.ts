import { IGenericDomainService } from "src/common/domain/services/generic-domain.service.interface";
import { phoneOperatorsEnum } from "../phoneAggregate/value-objects/phoneOperators.enum";
import { Line } from "../phoneAggregate/value-objects/line";
export class ValidateIsLineValidService implements IGenericDomainService<Line,boolean> {
    execute(dto: Line): boolean {
        return dto != null;
    }
}
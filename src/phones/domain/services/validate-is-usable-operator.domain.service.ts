import { IGenericDomainService } from "src/common/domain/services/generic-domain.service.interface";
import { phoneOperatorsEnum } from "../phoneAggregate/value-objects/phoneOperators.enum";
export class ValidateIsUsableOperatorService implements IGenericDomainService<number,boolean> {
    execute(dto: number): boolean {
        return Object.values(phoneOperatorsEnum).includes(
            dto.toString().substring(0, 3) as phoneOperatorsEnum,
          );
    }
}
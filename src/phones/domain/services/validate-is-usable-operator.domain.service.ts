import { IGenericDomainService } from "src/common/domain/services/generic-domain.service.interface";
import { phoneOperatorsEnum } from "../phoneAggregate/value-objects/phoneOperators.enum";
export class ValidateIsUsableOperatorService implements IGenericDomainService<string,boolean> {
    execute(dto: string): boolean {
        return Object.values(phoneOperatorsEnum).includes(
            dto.toString().substring(0, 3) as phoneOperatorsEnum,
          );
    }
}
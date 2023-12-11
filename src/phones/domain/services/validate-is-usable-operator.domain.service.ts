import { IGenericDomainService } from "src/common/domain/services/generic-domain.service.interface";
import { phoneOperatorsEnum } from "../value-objects/phoneOperators.enum";
export class ValidateIsUsableOperatorService implements IGenericDomainService<number,boolean> {
    execute(dto: number): boolean {
        console.log(dto.toString().substring(0, 3) as phoneOperatorsEnum)
        console.log(Object.values(phoneOperatorsEnum).includes(
            dto.toString().substring(0, 3) as phoneOperatorsEnum,
          ),"codnio")
        return Object.values(phoneOperatorsEnum).includes(
            dto.toString().substring(0, 3) as phoneOperatorsEnum,
          );
    }
}
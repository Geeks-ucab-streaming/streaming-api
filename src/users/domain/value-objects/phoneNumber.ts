
import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Operators } from "../services/phoneOperator/phoneOperator";
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { PhoneOperator } from "../phoneOperator/phoneOperator.interface";
import { BadRequestException } from "@nestjs/common";
import { PhoneInvalidExceptions } from "src/phones/domain/exceptions/phone-not-valid-exception";
  
export class PhonesNumber implements IValueObject<PhonesNumber>, PhoneOperator {
private readonly value: number;
constructor(value: number) {
    this.value = value;
    if (this.isUsableOperator(this.value)) {
        throw new PhoneInvalidExceptions();
    }
}

isUsableOperator(phoneNumber: number): boolean {
    return !Object.values(phoneOperatorsEnum).includes(
        phoneNumber.toString().substring(0, 3) as phoneOperatorsEnum
    );
}

equals(other: PhonesNumber): boolean {
    // Implementar la lógica de igualdad aquí
    return true;
}

dial(number: string): void {
    // Implementar la lógica de marcado aquí
}

  hangUp(): void {
    // Implementar la lógica de colgar aquí
  }
}


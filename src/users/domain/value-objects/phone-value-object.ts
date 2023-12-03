
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { PhoneOperator } from "../phoneOperator/phoneOperator.interface";
import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
  
export class phonePrefix implements IValueObject<phonePrefix>, PhoneOperator {
  private readonly value: number;
  get Value(): number {
    return this.value;
  }

  constructor(value: number) {
    this.value = value;
    if (this.isUsableOperator(value)) {
      console.log('Operador no disponible');
    }
  }

  isUsableOperator(phoneNumber: number): boolean {
    return !Object.values(phoneOperatorsEnum).includes(
      phoneNumber.toString().substring(0, 3) as phoneOperatorsEnum,
    );
  }

  equals(vo: phonePrefix): boolean {
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


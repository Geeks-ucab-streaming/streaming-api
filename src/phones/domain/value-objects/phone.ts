import { PhoneInvalidExceptions } from '../exceptions/phone-not-valid-exception';
import { Line } from './line';
import { phoneOperatorsEnum } from './phoneOperators.enum';

export class Phone {
  id: string;
  phoneNumber: number;
  linePhone: Line;

  constructor(id: string, phoneNumber: number, line: Line) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.linePhone = line;
    if (
      this.isUsableOperator(this.phoneNumber) ||
     !this.lineValid(this.linePhone)
    ) {
      throw new PhoneInvalidExceptions();
    }
  }

  private isUsableOperator(phoneNumber: number): boolean {
    return !Object.values(phoneOperatorsEnum).includes(
      phoneNumber.toString().substring(0, 3) as phoneOperatorsEnum,
    );
  }
  private lineValid(line: Line): boolean  {
    return line != null;
  }
}

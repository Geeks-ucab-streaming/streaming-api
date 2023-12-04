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
  
  }
}

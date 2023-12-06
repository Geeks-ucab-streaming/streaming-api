import { PhoneInvalidExceptions } from '../exceptions/phone-not-valid-exception';
import { Line } from './line';
import { phoneOperatorsEnum } from './phoneOperators.enum';
import { PhoneRegistedAlredyExceptions } from '../exceptions/phone-already-registered.exception';

export class Phone {
  id: string;
  phoneNumber:  phoneNumber;
  linePhone: Line;

  constructor(id: string, phoneNumber:  phoneNumber, line: Line) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.linePhone = line;
  
  }

}

export class phoneNumber {
  static create(phone: number): phoneNumber {
    return new phoneNumber(phone);
  }
  private _phoneNumber: number;
  constructor(phoneNumber: number) {
    this._phoneNumber = phoneNumber;
  }
  public get phoneNumber(): number {
    return this._phoneNumber;
  }
  public async isValidPhoneNumber(phoneNumber: phoneNumber): Promise<boolean> {
    if(this._phoneNumber === phoneNumber._phoneNumber) throw new PhoneRegistedAlredyExceptions();
    return true;
  }
}

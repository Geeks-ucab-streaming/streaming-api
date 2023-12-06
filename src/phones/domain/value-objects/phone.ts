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

  static create(id: string, _phoneNumber:  number, id_line:string,line: string): Phone {
    return new Phone(id, phoneNumber.create(_phoneNumber), Line.create(id_line,Object.keys(phoneOperatorsEnum).find(key => phoneOperatorsEnum[key] === line)));
  }

}

export class phoneNumber {
  static create(phone: number): phoneNumber {
    return new phoneNumber(phone);
  }
  private _phoneNumber: number;
  constructor(phoneNumber: number) {
    if(!this.isValidOperator(phoneNumber))throw new PhoneInvalidExceptions(this);
    this._phoneNumber = phoneNumber;
  }
  public get phoneNumber(): number {
    return this._phoneNumber;
  }
  public async isValidPhoneNumber(phoneNumber: phoneNumber): Promise<boolean> {
    if(this._phoneNumber === phoneNumber._phoneNumber) throw new PhoneRegistedAlredyExceptions(this);
    return true;
  }
  public isValidOperator(phoneNumber: number): boolean {
     if (
      !Object.values(phoneOperatorsEnum).includes(
        phoneNumber.toString().substring(0, 3) as phoneOperatorsEnum,
      )
    )
        return false;
    return true;
  }
}

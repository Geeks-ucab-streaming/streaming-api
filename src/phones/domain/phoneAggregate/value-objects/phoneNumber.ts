import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { PhoneRegistedAlredyExceptions } from "../../exceptions/phone-already-registered.exception";
import { PhoneInvalidExceptions } from "../../exceptions/phone-not-valid-exception";
import { phoneId } from "./phoneId";
import { phoneOperatorsEnum } from "./phoneOperators.enum";

export class phoneNumber implements IValueObject<phoneNumber>{

  private _phoneNumber: number;

  constructor(phoneNumber: number) {
    if(!this.isValidOperator(phoneNumber))throw new PhoneInvalidExceptions(this);
    this._phoneNumber = phoneNumber;
  }

  static create(phone: number): phoneNumber {
    return new phoneNumber(phone);
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

  public equals(userPhoneNumber: phoneNumber): boolean {
    return this._phoneNumber === userPhoneNumber.phoneNumber;
  }

}
import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { PhoneRegistedAlredyExceptions } from "../../exceptions/phone-already-registered.exception";
import { PhoneInvalidExceptions } from "../../exceptions/phone-not-valid-exception";
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { Result } from "src/common/domain/logic/Result";

export class phoneNumber implements IValueObject<phoneNumber>{

  private _phoneNumber: string;

  constructor(phoneNumber: string) {
    if(!this.isValidOperator(phoneNumber))throw new PhoneInvalidExceptions(phoneNumber);
    this._phoneNumber = phoneNumber;
  }

  static create(phone: string): phoneNumber {
    return new phoneNumber(phone);
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public async isValidPhoneNumber(phoneNumber: phoneNumber): Promise<Result<boolean>> {
    if(this._phoneNumber === phoneNumber._phoneNumber) return Result.fail<boolean>(new PhoneRegistedAlredyExceptions(phoneNumber));
    return Result.success<boolean>(true);
  }

  public isValidOperator(phoneNumber: string): boolean {
     if (
      !Object.values(phoneOperatorsEnum).includes(
        phoneNumber?.toString().substring(0,3) as phoneOperatorsEnum,
      )
    )
        return false;
    return true;
  }

  public extractPrefix(phoneNumber: string): string {
      return phoneNumber?.toString().substring(0,3);
 }

  public equals(userPhoneNumber: phoneNumber): boolean {
    return this._phoneNumber === userPhoneNumber.phoneNumber;
  }

}
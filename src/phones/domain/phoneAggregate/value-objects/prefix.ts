import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { phoneId } from "./phoneId";

export class Prefix implements IValueObject<Prefix>{
  private id: string;
  private prefix: number;

  constructor(id: string, prefix: number) {
    this.id = id;
    this.prefix = prefix;
  }

  public equals(phonePrefix: Prefix): boolean {
    return this.prefix === phonePrefix.prefix;
  }
}

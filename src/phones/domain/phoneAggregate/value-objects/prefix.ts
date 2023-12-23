import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class Prefix implements IValueObject<Prefix>{
  private id: string;
  private prefix: number;

  constructor(id: string, prefix: number) {
    this.id = id;
    this.prefix = prefix;
  }

  get Id(): string {
    return this.id;
  }

  get Prefix(): number {
    return this.prefix;
  }

  public equals(phonePrefix: Prefix): boolean {
    return this.prefix === phonePrefix.prefix;
  }
}
